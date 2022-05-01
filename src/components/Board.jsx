import React from 'react'
import {ReactFlowProvider} from 'react-flow-renderer';
import { Link } from 'react-router-dom';
import { EditBar } from './EditBar';
import Flow2 from './Flow2';


export const Board = () => {
  return (
    <>
    <div>
        <Link to="/home">
          <div>
            <p>Volver al home</p>
          </div>
        </Link>  
      </div>
    <div className='grid grid-cols-10 gap-1'>
      
      <ReactFlowProvider>
            <div className='col-span-8 border-solid border-2 border-sky-500 m-1 h-screen' >
                {/* <Flow></Flow> */}
                <Flow2/>

                {/* <Flow2/> */}
            </div>
            <div className='col-span-2 border-solid border-2 border-sky-500 m-1 h-screen'>
                <EditBar/>
            </div>
      </ReactFlowProvider>
    </div>
    </>

  )
}