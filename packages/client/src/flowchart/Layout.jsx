import React, { useState } from 'react';
import { ReactFlowProvider, addEdge, removeElements } from 'react-flow-renderer';
import FlowChart from './FlowChart.jsx';
import { nodeExtent, createDagreElements } from './dagre-elements.js';

// eslint-disable-next-line react/prop-types
function Layout({ initialElements }) {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const onLayout = (direction) => {
    const dagreElements = createDagreElements(elements, direction);
    setElements(dagreElements);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <FlowChart
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          nodeExtent={nodeExtent}
          onLayout={onLayout}
        />
      </ReactFlowProvider>
    </div>
  );
}

export default Layout;
