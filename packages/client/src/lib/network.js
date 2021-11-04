import { getApiServerPortByStaticServerPort } from './default-vars.js';
import config from '../config.js';

function getApiServerEndPoint() {
  return config.apiServerEndPoint;
}

function setApiServerEndPoint() {
  const { protocol, hostname, port } = window.location;
  const apiServerPort = getApiServerPortByStaticServerPort(port);
  config.apiServerEndPoint = `${protocol}//${hostname}:${apiServerPort}`;
}

export { getApiServerEndPoint, setApiServerEndPoint };
