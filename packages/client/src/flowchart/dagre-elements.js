/* eslint-disable no-param-reassign */
import dagre from 'dagre';
import { isNode, Position } from 'react-flow-renderer';

const nodeExtent = [
  [0, 0],
  [1000, 1000],
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function createLayoutedElements(elements, isHorizontal) {
  const layoutedElements = elements.map((element) => {
    if (isNode(element)) {
      const nodeWithPosition = dagreGraph.node(element.id);
      element.targetPosition = isHorizontal ? Position.Left : Position.Top;
      element.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
      // we need to pass a slightly different position in order to notify react flow about the change
      // @TODO how can we change the position handling so that we dont need this hack?
      element.position = { x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y };
    }

    return element;
  });
  return layoutedElements;
}

function createDagreElements(elements, direction) {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: 150, height: 50 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);
  const layoutedElements = createLayoutedElements(elements, isHorizontal);
  return layoutedElements;
}

export { nodeExtent, createDagreElements };
