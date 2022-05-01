import { useCallback, useMemo, useState, useRef } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, ReactFlowProvider, addEdge,
    useNodesState,
    useEdgesState,
    Controls, } from 'react-flow-renderer';
import { SoftwareSystemNode } from './custom nodes/SoftwareSystemNode';

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
    },
  
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
        id: '4',
        type: 'contextRectangle',
        position: { x: 100, y: 100 },
        data: {title: 'Titulo', category: 'Categoria', description: 'Descripcion'}
    }
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onNodesChange2 = () => {
      console.log('onnodechange2');
  }

  const onEdgesChange2 = () => {
    console.log('onEdgesChange2');
  }

  const nodeTypes = useMemo(() =>({contextRectangle: SoftwareSystemNode}) , []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(node) => console.log(nodes)}
      fitView
    />
  );
}

export default Flow;