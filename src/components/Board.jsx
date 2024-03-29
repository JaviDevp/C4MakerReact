import { ReactFlowProvider } from 'react-flow-renderer';
import { EditBar } from './EditBar';
import Flow2 from './Flow2';
import { HeaderBoard } from './HeaderBoard';

export const Board = () => {
	return (
		<>
			<div className='grid grid-cols-10 gap-1'>
				<ReactFlowProvider>
					<div className='col-span-10  m-1'>
						<HeaderBoard />
					</div>

					<div className='col-span-8 border-solid border border-neutral-300 m-1 h-screen'>
						<Flow2 />
					</div>

					<div className='col-span-2 border-solid border border-neutral-300 m-1 h-screen'>
						<EditBar />
					</div>
				</ReactFlowProvider>
			</div>
		</>
	);
};
