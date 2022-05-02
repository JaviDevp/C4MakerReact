import React, { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactFlow, {addEdge,useNodesState,useEdgesState,Controls,useReactFlow, ConnectionLineType,  SmoothStepEdge, MarkerType, Background} from 'react-flow-renderer';
import { SoftwareSystemNode } from './custom nodes/SoftwareSystemNode';
import { setLabelEdge, noSelectEdge, selectEdge, setLabelEmpty } from '../actions/edges';
import './toolbar.css';
import { v4 as uuidv4 } from 'uuid';
import { ToolBar } from './ToolBar';
import { PersonNode } from './custom nodes/PersonNode';
import { DataBaseNode } from './custom nodes/DatabaseNode';
import { useFetchProject } from '../hooks/useFetchProject';
import { updateProject } from '../helpers/updateProject';
import { SocketContext } from '../context/SocketContext';
import html2canvas from 'html2canvas';
import { ExternalPersonNode } from './custom nodes/ExternalPerson';

const Flow2 = () => {
  const params = useParams();
  const project =  useFetchProject(params.id);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const dispatch = useDispatch();
  const {socket, online} = useContext(SocketContext);
  const [fit, setFit] = useState(true);

  useEffect(() => {
    socket.emit('joinRoom', {room: params.id})

    // * escuchar evento para recibir el nuevo nodo y actualizar el flow
    socket.on('newNode', (data) => {
      console.log('frontend: newNode');
      setNodes((nds) => nds.concat(data.node));
    })

    // * escuchar evento para recibir el nuevo edge y actualizar el flow
    socket.on('newEdge', (data) => {
      console.log('frontend: newEdge');
      setEdges((eds) => addEdge(data.edge, eds));
      setEdges((eds) => eds.map(edge => {
        edge.markerEnd =  {type: MarkerType.ArrowClosed}//.type = MarkerType.ArrowClosed;
        edge.style = {strokeWidth: 3}
        return edge;
      }));
    })

    // * escuchar evento para que se actualice la posición del node
    socket.on('movedNode', (data) => {
      console.log(`frontend: movedNode ${data.node.data.title}`);
      setNodes((nds) => nds.filter(n => {
        n.selected = false;
        if (n.id !== data.node.id) 
          return n;
      }));
      setNodes((nds) => nds.concat(data.node));
    })

    //* escuchar cuando se actualiza un nodo
    socket.on('updatedNode', (data) => {
      console.log(`frontend: updatedNode ${data.node}`);
      setNodes((nds) => nds.filter(n => {
        n.selected = false;
        if (n.id !== data.node.id) 
          return n;
      }));
      setNodes((nds) => nds.concat(data.node));
      
    })

    //* escuchar evento para que se actualice el label de un edge
    socket.on('changeLabel', (data) => {
      console.log('frontend: setLabel');
      setEdges((data.edges));
    })

    //* escuchar evento cuando se eliminen edges
    socket.on('deletedEdges', (data) => {
      console.log('frontend: deletedEdges');
      setEdges((edges) => edges.filter(edge => {
        if(edge.id !== data[0].id)
          return edge;
      }));
    })

    //* escuchar evento cuando se elimine nodes
    socket.on('deletedNodes', (data) => {
      console.log('frontend: deletedNodes');
      setNodes((nds) => nds.filter(n => {
        for(let i =0; i < data.length; i++) {
          if(n.id === data[i].id){
            continue;
          }
          return n;
        }
        /* if(edge.id !== data[0].id)
          return edge; */
      }));
    })


    return () => {
      socket.emit('leaveRoom', {room: params.id})
    }
  }, [])

  const handleOnNodeDragStop = (e, node) => {
    console.log(`se ha movido el nodo ${node.data.title}`);
    socket.emit('moveNode', {node, room: params.id});
    //socket.emit('updateNode', {data: node.data, room: params.id})
  }


  useEffect(() => {
    setNodes(project.diagramObject !== undefined ? project.diagramObject.nodes : []);
    setEdges(project.diagramObject !== undefined ? project.diagramObject.edges : []);
    //console.log(`nodes: ${nodes}, edges: ${edges}`);
  }, [project.diagramObject])
  
  const onSave = useCallback( async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(`flow`, flow);
      await updateProject(project.id, project.name, project.uid, flow, project.username)
    }
  }, [reactFlowInstance]);
  
  
  const handleEdgeClick = (e, edge) => {
    setEdges(edges => edges.map(ed => {
      if(ed.id === edge.id){
        dispatch(setLabelEdge(ed.label));
      }
      return ed;
    }));
    dispatch(selectEdge(edge))
  }

  const handleNodeMouseLeave = (e, node) => {
    socket.emit('updateNode', {node, room: params.id});
  }

  const handleOnEdgesDelete = (eds) => {
    console.log(`se ha eliminado el edge ${eds.length}`);
    socket.emit('deleteEdges', {edges:eds, room: params.id});
  }

  const handleOnNodesDelete = (nodes) => {
    console.log(`se ha eliminado el node ${nodes.length}`);
    socket.emit('deleteNodes', {nodes:nodes, room: params.id});
  }

  const handlePaneClick = () =>{
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(`flow`, flow);
      updateProject(project.id, project.name, project.uid, flow, project.username);
    }
    dispatch(setLabelEmpty());
    dispatch(noSelectEdge());
  }

  const onConnect = useCallback((par)=> {
    console.log('onConnect');
    //setEdges((eds) => addEdge(params, eds))
    socket.emit('insertEdge', {edge: par, room: params.id});
  }, []);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

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
      //setNodes((nds) => nds.concat(newNode));
      socket.emit('insertNode', {node: newNode, room: params.id})
    },
    [reactFlowInstance]
  );

  const nodeTypes = useMemo(() =>({
    SoftwareSystem: SoftwareSystemNode,
    Database: DataBaseNode,
    Person: PersonNode,
    ExternalPerson: ExternalPersonNode,
  }) , []);
  const edgeTypes = useMemo(() =>({ default: SmoothStepEdge }), []);

  function isObjEmpty(obj) {
    if(obj === undefined) return true;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  function capture() {
    setFit(true);
    const captureElement = document.querySelector('#flowContainer');
    html2canvas(captureElement)
        .then(canvas => {
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            return canvas
        })
        .then(canvas => {
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            const a = document.createElement('a')
            a.setAttribute('download', 'my-image.png')
            a.setAttribute('href', image)
            a.click()
            canvas.remove()
        })
  }

  return (
      <div className="dndflow" >
            <ToolBar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper} id='flowContainer'>
          { !isObjEmpty(project.diagramObject) ? 
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
            fitView={fit}
            connectionLineType={ConnectionLineType.Step}
            onEdgeClick={handleEdgeClick}
            // onNodeClick={handleNodeClick}
            onNodeMouseLeave={handleNodeMouseLeave}
            onPaneClick={handlePaneClick}
            onNodeDragStop={handleOnNodeDragStop}
            deleteKeyCode={['Delete', 'Backspace']}
            snapToGrid={true}
            onEdgesDelete={handleOnEdgesDelete}
            onNodesDelete={handleOnNodesDelete}
            minZoom={0.1}
          >
            <Controls />
            <Background variant="lines" gap={25} size={0.5} />
          </ReactFlow> : <div><h1>CARGANDO DIAGRAMA {project.id}</h1></div>
          }
        <button className='w-full border text-gray-700' onClick={capture}>Descargar Diagrama</button>
        </div>

      </div>
  );
};

export default Flow2;