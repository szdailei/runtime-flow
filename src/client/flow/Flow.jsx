import React, { useState } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import createDagreElements from './create-dagre-elements.js';
import nodeTypes from './nodeTypes.jsx';
import edgeTypes from './edgeTypes.jsx';

const defaultNodeViewPort = {
  width: '20em',
  height: '6em',
};

const defaultNodeDistance = {
  width: 100,
  height: 150
};

// eslint-disable-next-line react/prop-types
function Layout({ initialElements }) {
  const [elements, setElements] = useState(initialElements);

  const onLayout = (direction) => {
    const dagreElements = createDagreElements(elements, { direction, ...defaultNodeDistance });
    setElements(dagreElements);
  };

  const onElementClick = (event) => {
    event.preventDefault();
    //    console.log('params',params.id);
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes({...defaultNodeViewPort})}
        edgeTypes={edgeTypes}
        onLoad={() => onLayout('TB')}
        onElementClick={onElementClick}
        zoomOnScroll={false}
        nodesConnectable={false}
      />
      <Controls />
    </ReactFlowProvider>
  );
}

export default Layout;
