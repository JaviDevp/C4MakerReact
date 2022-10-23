import PropTypes from 'prop-types';
import { getSmoothStepPath } from 'react-flow-renderer';

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
}) {
	const edgePath = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<path id={id} className='react-flow__edge-path' d={edgePath} />
			<body>
				<input value={'dddd'} />
			</body>
		</>
	);
}

CustomEdge.propTypes = {
	id: PropTypes.string.isRequired,
	sourceX: PropTypes.number.isRequired,
	sourceY: PropTypes.number.isRequired,
	targetX: PropTypes.number.isRequired,
	targetY: PropTypes.number.isRequired,
	sourcePosition: PropTypes.object.isRequired,
	targetPosition: PropTypes.object.isRequired,
};
