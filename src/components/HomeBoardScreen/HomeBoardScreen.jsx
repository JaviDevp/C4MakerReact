import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../helpers/getProjects'
import { useFetchProjects } from '../../hooks/useFetchProjects';
import { LoadDiagram } from './LoadDiagram'
import { NewDiagramButton } from './NewDiagramButton'

export const HomeBoardScreen = () => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.auth.uid);

  const data = useFetchProjects(uid);
  // console.log(data)
  
  return (
    <div className='border m-1'>

      <div className='grid grid-cols-3 gap-4'>
        <NewDiagramButton/>
      </div>

      <div className='m-3 text-2xl	text-slate-900	font-semibold'>
        <span>Proyectos creados</span>
        
      </div>
      <hr className='m-3'/>

      {/* div para los proyectos hechos por el usuario logueado */}
      <div className='grid grid-cols-3 gap-4'>
        {
          data.map(project => (
              <LoadDiagram key={project.id} {...project}/>
          ))
        }
        {/* <LoadDiagram/> */}
      </div>

    </div>
  )
}
