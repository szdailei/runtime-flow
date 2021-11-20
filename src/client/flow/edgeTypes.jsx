/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { getBezierPath, getMarkerEnd, ArrowHeadType, EdgeText, getEdgeCenter } from 'react-flow-renderer';

const FlowEdgeComponent = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType || ArrowHeadType, markerEndId);
  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <EdgeText
        x={centerX}
        y={centerY}
        label={data.text}
        labelStyle={{ fill: 'white', fontSize: '2em' }}
        labelShowBg
        labelBgStyle={{ fill: 'red' }}
        labelBgPadding={[2, 4]}
        labelBgBorderRadius={2}
        onClick={() => console.log(data)}
      />
    </>
  );
};

const edgeTypes = {
  default: FlowEdgeComponent,
};

export default edgeTypes;
