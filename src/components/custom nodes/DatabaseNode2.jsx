import React, {useEffect, useState  }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const DataBaseNode2 = ({id, data}) => {
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
    <div className='grid justify-items-center border border-black'>
        <Handle type="target" position={Position.Top} />

        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"
            viewBox="0 20 50 50">
            <path d="
                M2,50
                A50,10 0 0,0 98,50
                A50,10 0 0,0 2,50
                L2,75
                A50,10,0 0,0 98,75
                L98,50             
                "  style={{'fill':'#38bdf8', 'stroke':'1'}}
            />
        </svg>

        {/* <div className='bg-sky-400 border border-black flex flex-col rounded-tr-3xl	'>

            <br/>
            

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

            
            
        </div> */}
        
        <Handle type="source" position={Position.Bottom}  id='a'/>

    </div>
    
  )
}
