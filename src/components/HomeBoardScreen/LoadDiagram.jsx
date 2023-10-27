import { Link } from 'react-router-dom';
import { deleteProject } from '../../helpers/deleteProject';
import { horaMes } from '../../helpers/horaMes';

export const LoadDiagram = ({
	id,
	name = 'proyecto name',
	createdAt = '12-12-2022',
	username = 'anfitrion name',
}) => {
	const handleClickEliminar = async () => {
		await deleteProject(id);
		window.location.reload(true);
	};

	return (
		<div className='m-3 p-3 border border-slate-500 rounded-md flex justify-between bg-slate-50'>
			<Link to={`/diagram/${id}`} className='grid grid-cols-8'>
				<div className='grid justify-items-center col-span-1 border-r mr-2 '>
					<span className='text-xl	text-slate-900	font-semibold '>{id}</span>
				</div>

				<div className='col-span-7'>
					<div className='flex justify-between'>
						<span className='text-xl	text-slate-900	font-semibold'>{name}</span>
					</div>

					<div>
						<span>fecha creación: {horaMes(createdAt)}</span>
					</div>

					<div>
						<span>anfitrión: {username}</span>
					</div>
				</div>
			</Link>
			<span>
				<button
					onClick={handleClickEliminar}
					className='border border-black rounded-full px-2 py-1 text-xs font-medium bg-red-300 hover:bg-red-400'>
					Eliminar
				</button>
			</span>
		</div>
	);
};
