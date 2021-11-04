import React from 'react';
import ReactFlow, { Controls, useStoreState, useZoomPanHelper } from 'react-flow-renderer';

function isInsideNodeBounds(x, y, node) {
  const {
    width,
    height,
    position: { x: nodeX, y: nodeY },
  } = node.__rf; // eslint-disable-line no-underscore-dangle

  const insideHorizontalBounds = x >= nodeX && x <= nodeX + width;
  const insideVerticalBounds = y >= nodeY && y <= nodeY + height;

  return insideHorizontalBounds && insideVerticalBounds;
}

// eslint-disable-next-line react/prop-types
const FlowChart = ({ elements, onConnect, onElementsRemove, nodeExtent, onLayout }) => {
  const nodes = useStoreState((state) => state.nodes);
  const { project } = useZoomPanHelper();

  const onPaneClick = (event) => {
    const boundingBox = event.target.getBoundingClientRect();

    const viewportX = event.pageX - boundingBox.left;
    const viewportY = event.pageY - boundingBox.top;
    const { x, y } = project({ x: viewportX, y: viewportY });

    const selectedNode = nodes.find((node) => isInsideNodeBounds(x, y, node));

    if (selectedNode) {
      console.log(`Node ${selectedNode.id} was selected.`);
    }
  };

  return (
    <>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        nodeExtent={nodeExtent}
        onLoad={() => onLayout('TB')}
        onPaneClick={onPaneClick}
        zoomOnScroll={false}
        defaultZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      />
      <Controls />
    </>
  );
};

export default FlowChart;
