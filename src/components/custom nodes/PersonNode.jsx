import React, {useContext, useEffect, useState  }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { useForm } from '../../hooks/useForm';

export const PersonNode = ({id, data, selected}) => {
    const {socket, online} = useContext(SocketContext)
    const params = useParams();
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'Título',
        category: (data.category !== undefined) ? data.category : 'Categoria',
        description: (data.description !== undefined) ? data.description : 'Descripción'
    })
    const {title, category, description} = formValues;
    
    useEffect(()=>{
        console.log(`la data ha cambiado, ${data.title}`);
        formValues.title = data.title;
        formValues.category = data.category;
        formValues.description = data.description;

    }, [data])

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
    <div className={`grid justify-items-center ${selected? 'border-dashed border-2 border-gray-600 rounded-md' :''}`}
    >
        <Handle type="target" position={Position.Top} />

        <div className='bg-blue-800	 rounded-full h-24 w-24 flex justify-center	translate-y-2'>
        </div>

        <div className='bg-blue-800	 flex flex-col p-2 rounded-full'>
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
