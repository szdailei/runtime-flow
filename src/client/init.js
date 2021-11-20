import { request } from './network/index.js';

const init = () => {
  request.init();
};

init.isFinished = () => request.isFinished();

export default init;
