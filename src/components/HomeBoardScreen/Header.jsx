import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Header = () => {
	const dispatch = useDispatch();
	const { name } = useSelector(state => state.auth);

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className='grid grid-cols-4 gap-4 border  border-gray-400 h-fit p-4 mb-4'>
			<div className='col-span-2 '>
				<p className='text-lg text-slate-800 font-semibold	'>
					Diseña diagramas C4
				</p>
			</div>

			<div className='col-span-2 justify-self-end  '>
				<span>{name} </span>
				<button
					className='bg-green-500 p-2 border border-black rounded-lg'
					onClick={handleLogout}>
					<span className='text-white text-lg font-bold '>Cerrar Sesión</span>
				</button>
			</div>
		</div>
	);
};
