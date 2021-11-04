const defaultVars = {
  defaultFile: 'default.json',
};

function getApiServerPortByStaticServerPort(staticServerPort) {
  const port = typeof staticServerPort === 'string' ? parseInt(staticServerPort, 10) : staticServerPort;
  return port + 1;
}

export { defaultVars, getApiServerPortByStaticServerPort };
