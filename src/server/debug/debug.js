import { join } from 'path';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'all';

/*
logger.appender.server = 'org.apache.log4j.net.SocketAppender';
logger.appender.server.Port = 4850;
logger.appender.server.RemoteHost = 'http://localhost';
logger.appender.server.ReconnectionDelay = 10000;
*/

function callStack() {
  const { prepareStackTrace } = Error;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = prepareStackTrace;
  return stack;
}

function shortPath(fullPath) {
  const level = 3;
  let path = '';

  const fields = fullPath.split('/');
  let start = fields.length - level;
  start = start >= 0 ? start : 0;
  for (let i = start; i < fields.length; i += 1) {
    path = join(path, fields[i]);
  }
  return path;
}

function debug(data) {
  const stack = callStack();
  const fileName = shortPath(stack[1].getFileName());
  const info = {
    file: fileName,
    func: stack[1].getFunctionName(),
    line: stack[1].getLineNumber(),
    data,
  };

  logger.debug(info);
}

export default debug;
