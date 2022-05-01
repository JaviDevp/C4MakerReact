import React, {useEffect, useState  }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const DataBaseNode = ({id, data}) => {
    //console.log(id);
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'Database Name',
        category: (data.category !== undefined) ? data.category : 'Categoria',
        description: (data.description !== undefined) ? data.description : 'Descripción'
    })
    const {title, category, description} = formValues;
    
    const {setNodes, getNodes} = useReactFlow();
    //console.log(getNodes());

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
    

  return (
    <div className='grid justify-items-center'>
        <Handle type="target" position={Position.Top} />

        <div className='bg-sky-400 border border-black flex flex-col rounded-tr-3xl	'>
            {/* <div className='bg-sky-400 border border-black rounded-full h-24 w-full flex justify-center '>

            </div> */}
            <br/>
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
                    className='bg-transparent text-center focus:outline-none text-white	'
                >
                </textarea>
            </div>
            
        </div>
        <Handle type="source" position={Position.Bottom}  id='a'/>

    </div>
    
  )
}
