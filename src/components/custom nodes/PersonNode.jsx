import React, { useEffect, useRef }from 'react'
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const PersonNode = ({id, data, selected}) => {
    const [formValues, handleInputChange] = useForm({
        title: (data.title !== undefined) ? data.title : 'Título',
        category: (data.category !== undefined) ? data.category : 'Categoria',
        description: (data.description !== undefined) ? data.description : 'Descripción'
    })
    const {title, category, description} = formValues;
    const ref = useRef(null);
    
    const {setNodes, getNodes} = useReactFlow();

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
    const handleStyleLeft2 = { left: 205};
    const handleStyleTop = { top: 150 };
    const handleStyleTop2 = { top: 230 };
    const targetStyle = {background: '#fff', border: '1px solid #000000'}

  return (
    <div className={`grid justify-items-center ${selected? 'border-dashed border-2 border-gray-600 rounded-md' :''}`}
    >
        <Handle type="source" position={Position.Top} id='a'
            style={handleStyleLeft}/>
        <Handle
            type="target" position={Position.Top} id='b'
            style={{left: 205 , ...targetStyle}}
        />

        <Handle type="source" position={Position.Right} id='c' style={handleStyleTop2}/>
        <Handle
            type="target" position={Position.Right} id='d'
            style={{top: 150, ...targetStyle}}  
        />

        <Handle type="source" position={Position.Bottom} id='e' style={handleStyleLeft2}/>
        <Handle
            type="target" position={Position.Bottom} id='f'
            style={{left: 120, ...targetStyle}}
        />
        
        <Handle type="source" position={Position.Left}  id='g' style={handleStyleTop}/>
        <Handle
            type="target" position={Position.Left}  id='h'
            style={{top: 230, ...targetStyle}}
        />

        <div className='bg-blue-800 border border-black	 rounded-full h-24 w-24 flex justify-center	translate-y-2'>
        </div>

        <div className='bg-blue-800	border border-black flex flex-col p-2 rounded-full'>
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

    </div>
    
  )
}
