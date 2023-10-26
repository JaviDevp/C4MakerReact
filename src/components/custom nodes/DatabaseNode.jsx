import { useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'react-flow-renderer';
import { useForm } from '../../hooks/useForm';

export const DataBaseNode = ({ id, data, selected }) => {
	const [formValues, handleInputChange] = useForm({
		title: data.title !== undefined ? data.title : 'Data Name',
		category: data.category !== undefined ? data.category : '[Detail]',
		description:
			data.description !== undefined ? data.description : 'Description',
	});
	const { title, category, description } = formValues;

	const { setNodes, getNodes } = useReactFlow();

	useEffect(() => {
		setNodes(
			getNodes().map(nodo => {
				if (nodo.id === id) {
					nodo.data = {
						title,
						category,
						description,
					};
				}
				return nodo;
			})
		);
	}, [title, category, description]);

	const handleStyleLeft = { left: 120 };
	const handleStyleLeft2 = { left: 205 };
	// const handleStyleTop = { top: 150 };
	const handleStyleTop2 = { top: 150 };
	const targetStyle = { background: '#fff', border: '1px solid #000000' };
	const dbStyle = {
		background: 'rgb(14 116 144)',
		border: '1px solid #000000',
		borderRadius: '170px/30px',
	};

	return (
		<div
			className={`grid justify-items-center ${
				selected ? 'border-dashed border-2 border-gray-600 rounded-md' : ''
			}`}>
			<Handle
				type='source'
				position={Position.Top}
				id='a'
				style={handleStyleLeft}
			/>
			<Handle
				type='target'
				position={Position.Top}
				id='b'
				style={{ left: 205, ...targetStyle }}
			/>

			<Handle
				type='source'
				position={Position.Right}
				id='c'
				style={handleStyleTop2}
			/>
			<Handle
				type='target'
				position={Position.Right}
				id='d'
				style={{ top: 70, ...targetStyle }}
			/>

			<Handle
				type='source'
				position={Position.Bottom}
				id='e'
				style={handleStyleLeft2}
			/>
			<Handle
				type='target'
				position={Position.Bottom}
				id='f'
				style={{ left: 120, ...targetStyle }}
			/>

			<Handle
				type='source'
				position={Position.Left}
				id='g'
				style={{ top: 70 }}
			/>
			<Handle
				type='target'
				position={Position.Left}
				id='h'
				style={{ top: 150, ...targetStyle }}
			/>

			{/* <div className='bg-cyan-500	border-l border-r border-b border-black rounded-lg'> */}
			<div style={dbStyle}>
				{/* <div className='bg-cyan-500 border border-black	rounded-full h-16 w-full flex justify-center '>
            </div> */}
				<div className='mt-4 mb-1'>
					<input
						type='text'
						name='title'
						id='title'
						onChange={handleInputChange}
						value={title}
						autoComplete='off'
						className='text-center w-full focus:outline-none 
                            bg-transparent text-white text-2xl font-bold	'
					/>
				</div>

				<div className='mb-4'>
					<input
						type='text'
						name='category'
						id='category'
						onChange={handleInputChange}
						value={category}
						autoComplete='off'
						className='text-center w-full focus:outline-none
                            bg-transparent text-white	
                            text-xl'
					/>
				</div>

				<div className='mb-2'>
					<textarea
						name='description'
						id='description'
						cols='40'
						rows='4'
						onChange={handleInputChange}
						value={description}
						className='bg-transparent text-center focus:outline-none text-white	'></textarea>
				</div>
			</div>
		</div>
	);
};
