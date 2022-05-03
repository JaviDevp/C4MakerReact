import React, {useContext, useEffect, useState} from 'react'
import ReactFlow, { useReactFlow } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLabelEdge } from '../actions/edges';
import { SocketContext } from '../context/SocketContext';
import { useForm } from '../hooks/useForm';
//import { ClipBoardButton } from './ClipBoardButton';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from 'react-hot-toast';



export const EditBar = () => {
  const {setEdges, getEdges} = useReactFlow();
  const {selected, edge} = useSelector(state => state.edges);
  const {label} = useSelector(state => state.labelEdge);
  const dispatch = useDispatch();
  const [a, setA] = useState('');
  const {socket} = useContext(SocketContext);
  const params = useParams();
  const [users, setUsers] = useState(0);

  /* useEffect(() => {
    socket.on('updateUsers', (data) => {
      setUsers(data);
    })
  }, []) */
  

  console.log(params)
  const [formValues, handleInputChange] = useForm({
    description: label
  })
  
  const {description} = formValues;

  useEffect(() => {
    setA(label);
  }, [label])

  useEffect(() => {
  }, [a])

  const handleButtonClick = () => {
    dispatch(setLabelEdge(description));
    if(!selected) return;
    
    setEdges(edges => edges.map(ed =>{
        if(ed.id === edge.id ){
            ed.label = a;
        }
        return ed;
    }))
    const edges = getEdges();
    socket.emit('setLabel', {edges: edges, room: params.id})
  }

  const handleInputChangeA = (e) => {
    setA(e.target.value);
  }

  
  return (
    <div className='ml-1 mt-1'>
        <div className='flex flex-col my-3 mx-1'>
            <label className='mt-2 mb-1'>Descripción del conector</label>
            <textarea
                name='description'
                onChange={handleInputChangeA}
                value={a}
                className='mb-2 border-solid border border-gray-500 rounded-md'
            />
            
            <button className='border-solid border rounded-md border-gray-500 my-3 hover:bg-slate-300'
                    onClick={handleButtonClick}
            >
              Aplicar
            </button>
        </div>

        <div className='mx-1'>
          <CopyToClipboard text={`Enlace de invitación para el proyecto: https://c4maker.herokuapp.com/diagram/${params.id}`}>
            <button 
              className='my-4 py-2 px-3 bg-green-600 border border-gray-500 rounded-md text-white font-bold
                         hover:bg-green-700 hover:text-white'
              onClick={() => toast("invitación copiada al portapapeles",
              {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
                position: "bottom-right",
                autoClose: 3000
              })}
            >
              Copiar invitación
            </button>
          </CopyToClipboard>

          <Toaster/>
        </div>

        {/* <div>
          <span>En Línea: {users}</span>

        </div> */}
    </div>
  )
}
