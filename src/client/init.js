import globalVars from './global-vars.js';
import { getApiServerPort, getApiServerPath } from '../api-server-vars.js';

function setServerEndPoint(apiServerEndPoint) {
  globalVars.apiServerEndPoint = apiServerEndPoint;
}

function init() {
  const { protocol, hostname, port } = window.location;
  const apiServerPort = getApiServerPort(port);
  const apiServerPath = getApiServerPath();
  const apiServerEndPoint = `${protocol}//${hostname}:${apiServerPort}${apiServerPath}`;

  setServerEndPoint(apiServerEndPoint);
}

export default init;
