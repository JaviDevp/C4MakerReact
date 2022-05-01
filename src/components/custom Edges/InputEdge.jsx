import React from 'react';
import { EdgeText, getBezierPath, getMarkerEnd, getSmoothStepPath, MarkerType } from 'react-flow-renderer';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  label = 'sds',
  arrowHeadType = 'arrowclosed',
  markerEnd// = MarkerType.ArrowClosed,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    arrowHeadType
  });

  const mark = getMarkerEnd();

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}

      />
      <body>
        <input value={'dddd'}/>
      </body>
    </>
  );
}
