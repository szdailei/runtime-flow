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

function findIDOnPaneClick(event, nodes, project) {
  const boundingBox = event.target.getBoundingClientRect();

  const viewportX = event.pageX - boundingBox.left;
  const viewportY = event.pageY - boundingBox.top;
  const { x, y } = project({ x: viewportX, y: viewportY });

  const selectedNode = nodes.find((node) => isInsideNodeBounds(x, y, node));

  if (selectedNode) {
    return selectedNode.id;
  }
  return null;
}

function findIDOnNodeDoubleClick(_, params) {
  return params.id;
}

function findIDOnElementClick(_, params) {
  return params.id;
}

export { findIDOnPaneClick, findIDOnNodeDoubleClick, findIDOnElementClick };
