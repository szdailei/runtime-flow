/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Handle } from 'react-flow-renderer';

const nodeStyle = {
  width: undefined,
  height: undefined,
  overflow: 'hidden',
  border: '1px solid',
  padding: '4px 10px',
};

const textStyle = {
  fontSize: '2em',
};

const StartNodeComponent = ({ data }) => {
  const startNodeStyle = {
    ...nodeStyle,
    borderRadius: '8px',
  };
  return (
    <div style={startNodeStyle}>
      <Handle type="target" position="left" />
      <Handle type="target" position="right" />
      <div style={textStyle}>{data.text}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

const EndNodeComponent = ({ data }) => {
  const endNodeStyle = {
    ...nodeStyle,
    borderRadius: '8px',
  };
  return (
    <div style={endNodeStyle}>
      <Handle type="target" position="top" />
      <div style={textStyle}>{data.text}</div>
      <Handle type="source" position="top" />
    </div>
  );
};

const ProcessNodeComponent = ({ data }) => {
  const processNodeStyle = {
    ...nodeStyle,
    borderRadius: '2px',
  };
  return (
    <div style={processNodeStyle}>
      <Handle type="target" position="top" />
      <div style={textStyle}>{data.text}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

const BackNodeComponent = ({ data }) => {
  const backNodeStyle = {
    ...nodeStyle,
    borderRadius: '2px',
  };
  return (
    <div style={backNodeStyle}>
      <Handle type="target" position="top" />
      <div style={textStyle}>{data.text}</div>
      <Handle type="source" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

const DecisionNodeComponent = ({ data }) => {
  const decisionNodeStyle = {
    ...nodeStyle,
    transform: 'skew(-30deg)',
  };

  const decisionNodeTextStyle = {
    ...textStyle,
    transform: 'skew(30deg)',
  };

  return (
    <div style={decisionNodeStyle}>
      <Handle type="target" position="top" />
      <div style={decisionNodeTextStyle}>{data.text}</div>
      <Handle type="source" position="bottom" />
      <Handle type="source" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

const nodeTypes = ({ width, height }) => {
  nodeStyle.width = width;
  nodeStyle.height = height;
  return {
    start: StartNodeComponent,
    end: EndNodeComponent,
    process: ProcessNodeComponent,
    back: BackNodeComponent,
    decision: DecisionNodeComponent,
  };
};

export default nodeTypes;
