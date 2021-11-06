import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { findIDOnElementClick } from './id-finder.js';

// eslint-disable-next-line react/prop-types
function FlowChart({ elements, onConnect, onElementsRemove, nodeExtent, onLayout }) {
  const onElementClick = (event, params) => {
    event.preventDefault();
    console.log('onElementClick', findIDOnElementClick(event, params));
  };

  return (
    <>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        nodeExtent={nodeExtent}
        onLoad={() => onLayout('TB')}
        onElementClick={onElementClick}
        zoomOnScroll={false}
        defaultZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      />
      <Controls />
    </>
  );
}

export default FlowChart;
