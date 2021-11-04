import { getApiServerPortByStaticServerPort } from '../packages/client/src/lib/default-vars';

const defaultVars = {
  name:'runtime-flow',
  port: 3000,
  webRoot: './web',
  storageRoot: '.',
};

export { defaultVars, getApiServerPortByStaticServerPort };
