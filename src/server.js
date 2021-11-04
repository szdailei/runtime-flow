import { join, isAbsolute } from 'path';
import staticServer from '../../mdx-show/packages/static-server/src/static-server.js';
import graphqlServer from '../../mdx-show/packages/api-server/src/graphql-server.js';
import storage from '../../mdx-show/packages/api-server/src/lib/storage.js';
import { defaultVars, getApiServerPortByStaticServerPort } from './default-vars.js';
import { findTheFirstAvailablePort } from './net-port-checker.js';
import { registerRunningServers } from './daemon-controller.js';

async function server({ port, web, flow } = {}) {
  const theScriptDir = new URL('.', import.meta.url).pathname;
  const theWorkingDir = process.cwd();

  let staticServerPort = port || defaultVars.port;

  if (!port) {
    staticServerPort = await findTheFirstAvailablePort(staticServerPort);
  }

  let staticRoot;
  if (!web) {
    staticRoot = join(theScriptDir, defaultVars.webRoot);
  } else {
    staticRoot = isAbsolute(web) ? web : join(theWorkingDir, web);
  }

  const sServer = staticServer(staticServerPort, staticRoot);
  sServer.name = `${defaultVars.name} web-server`

  let storageRoot;
  if (!flow) {
    storageRoot = join(theWorkingDir, defaultVars.storageRoot);
  } else {
    storageRoot = isAbsolute(flow) ? flow : join(theWorkingDir, flow);
  }
  storage.setStorageRoot(storageRoot);

  const apiServerPort = getApiServerPortByStaticServerPort(staticServerPort);
  const gServer = graphqlServer(apiServerPort);
  gServer.name = `${defaultVars.name} api-server`;

  registerRunningServers([sServer, gServer]);

  return sServer.address().port;
}

export { server as runtimeFlowServer, staticServer };
