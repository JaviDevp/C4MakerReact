import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useSocket } from '../hooks/useSocket';
import { Header } from './HomeBoardScreen/Header';
import { HomeBoardScreen } from './HomeBoardScreen/HomeBoardScreen';

export const HomeScreen = () => {
  const {socket, online} = useContext(SocketContext)
  const onclick = () => {
    console.log('button click');
    socket.emit('button', {m: "hola"});
  }

  return (
    <div className='grid justify-items-center border-4  h-full pt-0 bg-gray-100'>
      <div className='w-3/4	bg-white border-1 '>

       <div>
         <Header/>
       </div>

       <div>
         <button onClick = {onclick}>
            emitir mensaje
         </button>
       </div>

        <div className='border-solid border border-gray-400 h-5/6'>
          <HomeBoardScreen/>
        </div>

      </div>
    </div>

    
    
  )
}
