export const NodeToolBar = ({ path, name }) => {
	return (
		<div className='grid justify-items-center mt-4 w-1/2 text-center'>
			<div className='border border-slate-400 p-1'>
				<img src={path} />
			</div>
			<hr />
			<p className=''>{name}</p>
		</div>
	);
};
