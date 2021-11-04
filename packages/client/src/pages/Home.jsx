import React from 'react';
import { defaultVars } from '../lib/default-vars.js';
import { useRemoteData } from '../lib/cache.js';
import { Error } from '../components/index.js';
import Layout from '../flowchart/Layout.jsx';

function Home() {
  const { defaultFile } = defaultVars;
  const query = `{getFile(file:"${defaultFile}")}`;

  const { data, error } = useRemoteData(query);
  if (error) return <Error error={error} />;
  if (!data) return null;

  const initialElements = JSON.parse(data.getFile);
  const position = { x: 0, y: 0 };
  initialElements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.position = position;
  });

  return <Layout initialElements={initialElements} />;
}

export default Home;
