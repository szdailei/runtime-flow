/* eslint-disable no-param-reassign */
import React from 'react';
import { ArrowHeadType } from 'react-flow-renderer';
import globalVars from '../global-vars.js';
import useRemoteData from '../network/cache.js';
import { Error } from '../components/index.js';
import Layout from '../flowchart/Layout.jsx';

function Home() {
  const { elementsFile } = globalVars.flowchart;
  const query = {
    command: 'getFile',
    params: elementsFile,
  };

  const { data, error } = useRemoteData(query);
  if (error) return <Error error={error} />;
  if (!data) return null;

  const initialElements = JSON.parse(data);
  const position = { x: 0, y: 0 };
  initialElements.forEach((element) => {
    element.position = position;
    if (element.source && element.target) {
      element.type = 'default';
      element.arrowHeadType = element.arrowHeadType || ArrowHeadType.Arrow;
    }
  });

  return <Layout initialElements={initialElements} />;
}

export default Home;
