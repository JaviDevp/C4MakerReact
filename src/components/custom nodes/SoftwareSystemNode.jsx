import React, {useEffect, useState  }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const SoftwareSystemNode = ({id, data, selected}) => {
    //console.log(id);
    
    
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'Título',
        category: (data.category !== undefined) ? data.category : 'Categoria',
        description: (data.description !== undefined) ? data.description : 'Descripción'
    })
    const {title, category, description} = formValues;
    
    const {setNodes, getNodes, getEdges} = useReactFlow();
    //console.log(getNodes());
    console.log(getEdges());

    useEffect(() => {
        //console.log(getNodes());
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

    const handleStyle = { left: 50 };

    
    const handleStyleLeft = { left: 120 };
    const handleStyleLeft2 = { left: 205 };
    const handleStyleTop = { top: 140 };
    const handleStyleTop2 = { top: 80 };

  return (
    <div className={`${selected? 'border-dashed border-2 border-gray-600 rounded-md p-1' :''}`}>
    <div className={`bg-sky-600 border border-black flex flex-col p-2 rounded-sm `}>
        <Handle type="source" position={Position.Top} id='a' style={handleStyleLeft}/>
        <Handle
            type="target" position={Position.Top} id='b' style={handleStyleLeft2}
            className='bg-white border border-black'
        />

        <Handle type="source" position={Position.Right} id='c' style={handleStyleTop2}/>
        <Handle
            type="target" position={Position.Right} id='d' style={handleStyleTop}
            className='bg-white border border-black'
        />

        <Handle type="source" position={Position.Bottom} id='e' style={handleStyleLeft2}/>
        <Handle
            type="target" position={Position.Bottom} id='f' style={handleStyleLeft}
            className='bg-white border border-black'
        />
        
        <Handle type="source" position={Position.Left}  id='g' style={handleStyleTop}/>
        <Handle
            type="target" position={Position.Left}  id='h' style={handleStyleTop2}
            className='bg-white border border-black'
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
                rows="4"
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

SoftwareSystemNode.defaultProps = {
    title: 'Título',
    category: 'Categoría',
    description: 'Descripción'
}
