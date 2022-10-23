/* eslint-disable array-callback-return */
import './toolbar.css';
import {
	useState,
	useRef,
	useCallback,
	useMemo,
	useEffect,
	useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, {
	addEdge,
	useNodesState,
	useEdgesState,
	Controls,
	ConnectionLineType,
	SmoothStepEdge,
	MarkerType,
	Background,
} from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { SoftwareSystemNode } from './custom nodes/SoftwareSystemNode';
import {
	setLabelEdge,
	noSelectEdge,
	selectEdge,
	setLabelEmpty,
} from '../actions/edges';
import { ToolBar } from './ToolBar';
import { PersonNode } from './custom nodes/PersonNode';
import { DataBaseNode } from './custom nodes/DatabaseNode';
import { useFetchProject } from '../hooks/useFetchProject';
import { updateProject } from '../helpers/updateProject';
import { SocketContext } from '../context/SocketContext';
import { ExternalPersonNode } from './custom nodes/ExternalPerson';
import { ExternalSoftwareSystemNode } from './custom nodes/ExternalSoftwareSystemNode';
import { ContainerNode } from './custom nodes/ContainerNode';
import { ComponentNode } from './custom nodes/ComponentNode';
import { capture } from '../helpers/captureDiagram';
import { isObjEmpty } from '../helpers/isObjectEmpty';

function Flow2() {
	const params = useParams();
	const project = useFetchProject(params.id);
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const dispatch = useDispatch();
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.emit('joinRoom', { room: params.id });

		// * escuchar evento para recibir el nuevo nodo y actualizar el flow
		socket.on('newNode', data => {
			setNodes(nds => nds.concat(data.node));
		});

		// * escuchar evento para recibir el nuevo edge y actualizar el flow
		socket.on('newEdge', data => {
			setEdges(eds => addEdge(data.edge, eds));
			setEdges(eds =>
				eds.map(edge => {
					edge.markerEnd = { type: MarkerType.ArrowClosed };
					edge.style = { strokeWidth: 3 };
					edge.labelStyle = { fontSize: '1.5rem' };
					return edge;
				})
			);
		});

		// * escuchar evento para que se actualice la posición del node
		socket.on('movedNode', data => {
			setNodes(nds =>
				nds.filter(n => {
					n.selected = false;
					if (n.id !== data.node.id) return n;
				})
			);
			setNodes(nds => nds.concat(data.node));
		});

		//* escuchar cuando se actualiza un nodo
		socket.on('updatedNode', data => {
			setNodes(nds =>
				nds.filter(n => {
					n.selected = false;
					if (n.id !== data.node.id) {
						return n;
					}
				})
			);
			setNodes(nds => nds.concat(data.node));
		});

		//* escuchar evento para que se actualice el label de un edge
		socket.on('changeLabel', data => {
			setEdges(data.edges);
		});

		//* escuchar evento cuando se eliminen edges
		socket.on('deletedEdges', data => {
			setEdges(edges =>
				edges.filter(edge => {
					if (edge.id !== data[0].id) return edge;
				})
			);
		});

		//* escuchar evento cuando se elimine nodes
		socket.on('deletedNodes', data => {
			setNodes(nds =>
				nds.filter(n => {
					for (let i = 0; i < data.length; i++) {
						if (n.id === data[i].id) continue;
						return n;
					}
				})
			);
		});

		return () => {
			socket.emit('leaveRoom', { room: params.id });
		};
	}, []);

	const handleOnNodeDragStop = (e, node) => {
		socket.emit('moveNode', { node, room: params.id });
	};

	useEffect(() => {
		setNodes(
			project.diagramObject !== undefined ? project.diagramObject.nodes : []
		);
		setEdges(
			project.diagramObject !== undefined ? project.diagramObject.edges : []
		);
	}, [project.diagramObject]);

	const handleEdgeClick = (e, edge) => {
		setEdges(eds =>
			eds.map(ed => {
				if (ed.id === edge.id) {
					dispatch(setLabelEdge(ed.label));
				}
				return ed;
			})
		);
		dispatch(selectEdge(edge));
	};

	const handleNodeMouseLeave = (e, node) => {
		socket.emit('updateNode', { node, room: params.id });
	};

	const handleOnEdgesDelete = eds => {
		socket.emit('deleteEdges', { edges: eds, room: params.id });
	};

	const handleOnNodesDelete = nds => {
		socket.emit('deleteNodes', { nodes: nds, room: params.id });
	};

	const handlePaneClick = () => {
		if (reactFlowInstance) {
			const flow = reactFlowInstance.toObject();
			updateProject(
				project.id,
				project.name,
				project.uid,
				flow,
				project.username
			);
		}
		dispatch(setLabelEmpty());
		dispatch(noSelectEdge());
	};

	const onConnect = useCallback(par => {
		socket.emit('insertEdge', { edge: par, room: params.id });
	}, []);

	const onDragOver = useCallback(event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		event => {
			event.preventDefault();
			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData('application/reactflow');

			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) return;

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});
			const newNode = {
				id: uuidv4(),
				type,
				position,
				data: { label: `${type} node` },
			};
			socket.emit('insertNode', { node: newNode, room: params.id });
		},
		[reactFlowInstance]
	);

	const nodeTypes = useMemo(
		() => ({
			SoftwareSystem: SoftwareSystemNode,
			Database: DataBaseNode,
			Person: PersonNode,
			ExternalPerson: ExternalPersonNode,
			ExternalSoftwareSystem: ExternalSoftwareSystemNode,
			Container: ContainerNode,
			Component: ComponentNode,
		}),
		[]
	);
	const edgeTypes = useMemo(() => ({ default: SmoothStepEdge }), []);

	return (
		<div className='dndflow'>
			<ToolBar />
			<div
				className='reactflow-wrapper'
				ref={reactFlowWrapper}
				id='flowContainer'>
				{!isObjEmpty(project.diagramObject) ? (
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						edgeTypes={edgeTypes}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onInit={setReactFlowInstance}
						onDrop={onDrop}
						onDragOver={onDragOver}
						connectionLineType={ConnectionLineType.Step}
						onEdgeClick={handleEdgeClick}
						onNodeMouseLeave={handleNodeMouseLeave}
						onPaneClick={handlePaneClick}
						onNodeDragStop={handleOnNodeDragStop}
						deleteKeyCode={['Delete', 'Backspace']}
						snapToGrid
						onEdgesDelete={handleOnEdgesDelete}
						onNodesDelete={handleOnNodesDelete}
						minZoom={0.1}>
						<Controls />
						<Background variant='lines' gap={25} size={0.5} />
					</ReactFlow>
				) : (
					<div>
						<h1>CARGANDO DIAGRAMA</h1>
					</div>
				)}
				<button
					type='button'
					className='w-full border bg-white text-gray-900 font-semibold'
					onClick={capture}>
					Descargar Diagrama
				</button>
			</div>
		</div>
	);
}
export default Flow2;
