import React, { useEffect }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const ContainerNode = ({id, data, selected}) => {
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'Container Name',
        category: (data.category !== undefined) ? data.category : '[Container]',
        description: (data.description !== undefined) ? data.description : 'Descripion'
    })
    const {title, category, description} = formValues;
    
    const {setNodes, getNodes, getEdges} = useReactFlow();
    console.log(getEdges());

    useEffect(() => {
        setNodes(getNodes().map(nodo => {
            if(nodo.id === id){
                nodo.data = {
                    title: title,
                    category: category,
                    description: description
                };
            }
            return nodo;
        }) );
    }, [title, category, description]);

    const handleStyleLeft = { left: 120 };
    const handleStyleLeft2 = { left: 205 };
    const handleStyleTop = { top: 80 };
    const handleStyleTop2 = { top: 140 };
    const targetStyle = {background: '#fff', border: '1px solid #000000'}

  return (
    <div className={`${selected? 'border-dashed border-2 border-gray-600 rounded-md p-1' :''}`}>
    <div className={`bg-sky-500 border rounded-lg border-black flex flex-col p-2 `}>
    <Handle type="source" position={Position.Top} id='a'
            style={handleStyleLeft}/>
        <Handle
            type="target" position={Position.Top} id='b'
            style={{left: 205 , ...targetStyle}}
        />

        <Handle type="source" position={Position.Right} id='c' style={handleStyleTop2}/>
        <Handle
            type="target" position={Position.Right} id='d'
            style={{top: 80, ...targetStyle}}  
        />

        <Handle type="source" position={Position.Bottom} id='e' style={handleStyleLeft2}/>
        <Handle
            type="target" position={Position.Bottom} id='f'
            style={{left: 120, ...targetStyle}}
        />
        
        <Handle type="source" position={Position.Left}  id='g' style={handleStyleTop}/>
        <Handle
            type="target" position={Position.Left}  id='h'
            style={{top: 140, ...targetStyle}}
        />
        
        <div className='mt-4 mb-1'>
            <input
                type="text"
                name='title' 
                id='title'
                onChange={handleInputChange}
                value={title}
                autoComplete="off"
                className='text-center w-full focus:outline-none 
                           bg-transparent text-white text-2xl font-bold	'
            />
        </div>

        <div className='mb-4'>
            <input
                type="text"
                name='category'
                id='category'
                onChange={handleInputChange}
                value={category}
                autoComplete="off"
                className='text-center w-full focus:outline-none
                           bg-transparent text-white	
                           text-xl'
            />
        </div>

        <div className='mb-2'>
            <textarea
                name="description"
                id="description"
                cols="40"
                rows="3"
                onChange={handleInputChange}
                value={description}
                className='bg-transparent text-center focus:outline-none text-gray-200'
            >
            </textarea>
        </div>
    </div>
    </div>
  )
}

ContainerNode.defaultProps = {
    title: 'Título',
    category: 'Categoría',
    description: 'Descripción'
}
