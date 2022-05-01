import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const LoadDiagram = (
  {
    id,
    name = 'proyecto name',
    createdAt = '12-12-2022',
    username='anfitrion name'
  }
) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/diagram/${id}`);
  }

  return (
    <div className='m-3 p-3 border border-black rounded-md flex flex-col'>
      <Link
        to={`/diagram/${id}`}
        
      >
        <div>
          <span className='text-xl	text-slate-900	font-semibold'>
              {id + ' '}  
          </span>
          <span className='text-xl	text-slate-900	font-semibold'>
            Nombre: {' '}  
          </span>
          <span className='text-xl	text-slate-900	font-semibold'>
            {name}
          </span>
        </div>

        <div>
          <span>
            fecha creación: {createdAt}
          </span>
        </div>

        <div>
          <span>
            anfitrión: {username}
          </span>
        </div>
      </Link>
    </div>
  )
}
