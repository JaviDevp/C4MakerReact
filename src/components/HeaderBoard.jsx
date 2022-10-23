import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { updateProjectName } from '../helpers/updateProjectName';
import { useFetchProject } from '../hooks/useFetchProject';

export const HeaderBoard = () => {
	const { socket } = useContext(SocketContext);

	const params = useParams();
	const project = useFetchProject(params.id);
	const [name, setName] = useState('');

	useEffect(() => {
		socket.on('changedName', data => {
			setName(data.name);
		});
	}, []);

	useEffect(() => {
		setName(project.name !== undefined ? project.name : '');
	}, [project]);

	const handleInputChange = e => {
		setName(e.target.value);
	};

	const handleOnBlur = e => {
		updateProjectName(project.id, name);
		socket.emit('changeName', { name, room: params.id });
	};
	return (
		<div className='grid grid-cols-12 '>
			<div className='col-span-2'>
				<Link
					to='/home'
					className='w-2/3 border-solid border border-black block py-1 
                           text-gray-600 font-bold hover:bg-black hover:text-white  rounded-md'>
					<div>
						<p className='text-center'>Volver al home</p>
					</div>
				</Link>
			</div>

			<div className='col-span-10  place-items-center border-b border-gray-400 mx-8'>
				<input
					name='name'
					className='w-full text-center border-solid py-1 outline-none text-base text-gray-600 '
					placeholder='Nombre del proyecto'
					onChange={handleInputChange}
					value={name}
					autoComplete='off'
					onBlur={() => handleOnBlur()}
				/>
			</div>
		</div>
	);
};
