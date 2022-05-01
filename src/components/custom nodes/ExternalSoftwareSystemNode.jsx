import React, {useEffect, useState  }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const ExternalSoftwareSystemNode = ({id, data}) => {
    console.log(id);
    
    
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'External System Name',
        category: (data.category !== undefined) ? data.category : '[External System]',
        description: (data.description !== undefined) ? data.description : 'Description of external system'
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

    

  return (
    <div className='bg-gray-400	 flex flex-col p-2 rounded-sm	'>
        <Handle type="target" position={Position.Top} />
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
        <Handle type="source" position={Position.Bottom}  id='a'/>
        {/* <Handle type="target" position={Position.Bottom} style={handleStyle}/> */}


    </div>
  )
}

ExternalSoftwareSystemNode.defaultProps = {
    title: 'Título',
    category: 'Categoría',
    description: 'Descripción'
}
