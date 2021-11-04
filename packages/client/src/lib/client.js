import { getApiServerEndPoint } from './network.js';

async function createErrorByRes(res) {
  const resBody = await res.text();
  return new Error(`${res.status}: ${res.statusText}: ${resBody}`);
}

function createErrorByResult(result) {
  let msg = '';
  result.errors.forEach((resultError) => {
    let locationsMsg = '';
    resultError.locations.forEach((location) => {
      locationsMsg += `line:${location.line} column:${location.column}`;
    });
    msg += `${locationsMsg} ${resultError.message}\n`;
  });

  return new Error(msg);
}

async function parseResBody(res, resType) {
  switch (resType) {
    case 'text':
      return res.text();
    case 'json':
      return res.json();
    default:
      return null;
  }
}

async function request(query) {
  const resType = 'json';
  const endPoint = getApiServerEndPoint();
  const options = {
    method: 'POST',
    body: query ? JSON.stringify({ query }) : null,
  };

  let data;
  let error;
  try {
    const res = await fetch(endPoint, options);
    if (!res.ok) {
      error = await createErrorByRes(res); // Non-200 response.
      return { data, error };
    }

    const graphqlResult = await parseResBody(res, resType);
    if (!graphqlResult) error = new Error('resType wrong or response body format wrong');
    if (graphqlResult.errors) error = createErrorByResult(graphqlResult);

    data = graphqlResult.data || graphqlResult;
  } catch (httpError) {
    error = httpError;
  }

  return { data, error };
}

export default request;
