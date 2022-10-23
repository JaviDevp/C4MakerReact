import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../App.css';
import { createProject } from '../../helpers/createProject';

export const NewDiagramButton = () => {
	const navigate = useNavigate();
	const { name, uid } = useSelector(state => state.auth);

	const handleClick = async () => {
		const nuevoDiagrama = await createProject('New Project', uid, '', name);
		if (nuevoDiagrama.diagramObject) {
			navigate(`/diagram/${nuevoDiagrama.id}`);
		}
	};
	return (
		<div className='m-3 border border-gray-400 rounded-md'>
			<Link to='/diagram/' onClick={handleClick}>
				<div className='grid grid-cols-6 gap-1 m-2'>
					<div className='col-span-1 place-self-center m-2'>
						<ion-icon name='document-outline'></ion-icon>
					</div>

					<div className='col-span-4 '>
						<div>
							<p className='text-slate-700 font-semibold text-xl'>
								Nuevo diagrama
							</p>
						</div>
						<div>
							<p className='text-md text-slate-600'>
								Diseña un nuevo diagrama C4
							</p>
						</div>
					</div>

					<div className='col-span-1 place-self-center'>
						<ion-icon name='add-outline'></ion-icon>
					</div>
				</div>
			</Link>
		</div>
	);
};
