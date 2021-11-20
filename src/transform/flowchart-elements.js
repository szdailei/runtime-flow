function parser(log) {
  const debugSites = [];
  const lines = log.split('\n');

  lines.forEach((line) => {
    if (line.trim() !== '') debugSites.push(JSON.parse(line));
  });

  return debugSites;
}

function findNodes(nodeMap, debugSite, index) {
  const indexs = nodeMap.get(debugSite.id);

  if (!indexs) {
    nodeMap.set(debugSite.id, [index]);
  } else {
    indexs.push(index);
  }
}

function createNode(indexs, key, debugSites) {
  const data = {
    text: debugSites[indexs[0]].desc,
  };

  const node = {
    id: key,
    type: indexs.includes(0) ? 'start' : 'process',
    data,
  };

  return node;
}

function createEndNode() {
  const data = {
    text: 'End',
  };

  const node = {
    id: 'end',
    type: 'end',
    data,
  };

  return node;
}

function createNodes(nodeMap, debugSites) {
  const nodes = [];

  nodeMap.forEach((value, key) => {
    const node = createNode(value, key, debugSites);
    nodes.push(node);
  });

  return nodes;
}

function createEdge(debugSites, index) {
  const source = debugSites[index].id;

  let target;
  if (index === debugSites.length - 1) {
    target = 'end';
  } else {
    target = debugSites[index + 1].id;
  }

  const data = {
    text: index + 1,
  };

  const edge = {
    id: index + 1,
    source,
    target,
    data,
  };

  return edge;
}

function createEdgesOfOneNode(node, nodeMap, debugSites) {
  const edges = [];
  const indexs = nodeMap.get(node.id);

  indexs.forEach((index) => {
    edges.push(createEdge(debugSites, index));
  });

  return edges;
}

function createEdges(nodes, nodeMap, debugSites) {
  const edges = [];

  nodes.forEach((node) => {
    const edgesOfOneNode = createEdgesOfOneNode(node, nodeMap, debugSites);
    edgesOfOneNode.forEach((edge) => {
      edges.push(edge);
    });
  });

  return edges;
}

function createFlowchartElements(debugSites) {
  const elements = [];
  const nodeMap = new Map();

  debugSites.forEach((debugSite, index) => {
    findNodes(nodeMap, debugSite, index);
  });

  const nodes = createNodes(nodeMap, debugSites);
  const edges = createEdges(nodes, nodeMap, debugSites);

  nodes.forEach((node) => {
    elements.push(node);
  });

  elements.push(createEndNode());

  edges.forEach((edge) => {
    elements.push(edge);
  });

  return elements;
}

function flowchartElements(log) {
  const debugSites = parser(log);

  const elements = createFlowchartElements(debugSites);
  return { debugSites, elements };
}

export default flowchartElements;
