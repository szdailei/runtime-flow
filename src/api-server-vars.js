function getApiServerPort(staticServerPort) {
  const port = typeof staticServerPort === 'string' ? parseInt(staticServerPort, 10) : staticServerPort;
  return port + 1;
}

function getApiServerPath() {
  return '/rpc';
}

export { getApiServerPort, getApiServerPath };
