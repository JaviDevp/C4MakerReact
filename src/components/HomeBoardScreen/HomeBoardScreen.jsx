import { useSelector } from 'react-redux';
import { useFetchProjects } from '../../hooks/useFetchProjects';
import { LoadDiagram } from './LoadDiagram';
import { NewDiagramButton } from './NewDiagramButton';

export const HomeBoardScreen = () => {
	const uid = useSelector(state => state.auth.uid);
	const data = useFetchProjects(uid);

	return (
		<div className='m-1'>
			<div className='grid grid-cols-3 gap-4'>
				<NewDiagramButton />
			</div>

			<div className='m-3 text-2xl	text-slate-900	font-semibold'>
				<span>Proyectos creados</span>
			</div>
			<hr className='m-3' />

			<div className='grid grid-cols-3 gap-4'>
				{data.map(project => (
					<LoadDiagram key={project.id} {...project} />
				))}
			</div>
		</div>
	);
};
