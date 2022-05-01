import React, {useContext, useEffect, useState} from 'react'
import ReactFlow, { useReactFlow } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLabelEdge } from '../actions/edges';
import { SocketContext } from '../context/SocketContext';
import { useForm } from '../hooks/useForm';


export const EditBar = () => {
  const {setEdges, getEdges} = useReactFlow();
  const {selected, edge} = useSelector(state => state.edges);
  const {label} = useSelector(state => state.labelEdge);
  const dispatch = useDispatch();
  const [a, setA] = useState('');
  const {socket} = useContext(SocketContext);
  const params = useParams();


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
        <div>
            <label>Descripción Edge</label>
            <textarea
                name='description'
                onChange={handleInputChangeA}
                value={a}
                className='border-solid border-2 border-gray-500 pl-1 pr-1'
            />
            
        </div>
        <button className='border-solid border-2 border-gray-500'
                onClick={handleButtonClick}
        >
          Apply
        </button>
    </div>
  )
}
