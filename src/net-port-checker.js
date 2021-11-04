/* eslint-disable no-await-in-loop */
import net from 'net';

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => {
      resolve(false);
    });

    server.listen({ port }, () => {
      server.close();
      resolve(true);
    });
  });
}

async function findTheFirstAvailablePort(startPort) {
  let staticServerPort = startPort;

  while (staticServerPort < 65535) {
    if (await isPortAvailable(staticServerPort)) {
      return staticServerPort;
    }
    staticServerPort += 1;
  }

  throw new Error(`No available port start ${startPort}`);
}

export { isPortAvailable, findTheFirstAvailablePort };
