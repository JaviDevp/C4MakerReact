import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProject } from '../../helpers/deleteProject';
import { horaMes } from '../../helpers/horaMes';

export const LoadDiagram = (
  {
    id,
    name = 'proyecto name',
    createdAt = '12-12-2022',
    username='anfitrion name'
  }
) => {
  const navigate = useNavigate();

  const handleClickEliminar = async () => {
    console.log('eliminando proyecto');
    await deleteProject(id);
    window.location.reload(true);
  }

  return (
    <div className='m-3 p-3 border border-black rounded-md flex justify-between'>
      <Link
        to={`/diagram/${id}`}
        className='grid grid-cols-8'
      >
        <div className='grid justify-items-center col-span-1 border-r mr-2 '>
          <span className='text-xl	text-slate-900	font-semibold '>
              {id}  
          </span>
        </div>

        <div className='col-span-7'>
          <div className='flex justify-between'>
            <span className='text-xl	text-slate-900	font-semibold'>
              {name}
            </span>

            
          </div>

          <div>
            <span>
              fecha creación: {horaMes( createdAt )}
            </span>
          </div>

          <div>
            <span>
              anfitrión: {username}
            </span>

          </div>

          
        </div>

      </Link>
      <span>
        <button onClick={handleClickEliminar} className='border border-black rounded-full px-2 text-xs'>Eliminar</button>
      </span>
    </div>
  )
}
