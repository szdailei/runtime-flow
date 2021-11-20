/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import { makeid } from '../utils/index.js';
import { Div } from '../styled/index.js';

const data = [
  {
    id: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:14',
    type: 'start',
    data: { text: '做某件事' },
  },
  {
    id: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:19',
    type: 'process',
    data: { text: '第二件' },
  },
  {
    id: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:32',
    type: 'process',
    data: { text: '最后' },
  },
  { id: 'end', type: 'end', data: { text: 'End' } },
  {
    id: 1,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:14',
    target: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:19',
    data: { text: 1 },
  },
  {
    id: 4,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:14',
    target: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:19',
    data: { text: 4 },
  },
  {
    id: 2,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:19',
    target: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:32',
    data: { text: 2 },
  },
  {
    id: 5,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:19',
    target: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:32',
    data: { text: 5 },
  },
  {
    id: 3,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:32',
    target: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:14',
    data: { text: 3 },
  },
  {
    id: 6,
    source: 'file:///home/dailei/projects/mdx-show/work-flow/work-flow.js:32',
    target: 'end',
    data: { text: 6 },
  },
];

function DebugSite({ index, debugSite }) {
  const objStyle = {
    paddingLeft: '0.5em',
  };

  const messages = [];
  debugSite.stack.forEach((message) => {
    messages.push(
      <div key={makeid()} style={{ paddingLeft: '1em' }}>
        {message}
      </div>
    );
  });

  return (
    <Div style={objStyle}>
      {index + 1} - {debugSite.func}:{debugSite.line}
      <div style={{ paddingLeft: '1em', textIndent: '2em' }}>{debugSite.desc}</div>
      {messages}
    </Div>
  );
}

function DebugSites({ debugSites }) {
  const boxStyle = {
    height: '100vh',
    overflow: 'auto',
    flex: '0 0 auto',
  };

  const nodes = [];
  debugSites.forEach((debugSite, index) => {
    nodes.push(<DebugSite key={makeid()} index={index} debugSite={debugSite} />);
  });

  return nodes;
}

export default DebugSites;
