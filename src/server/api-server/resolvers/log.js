import { createWriteStream } from 'fs';

function log() {
  const stream = createWriteStream('append.txt', { flags: 'a' });
  console.log(new Date().toISOString());
  [...Array(10000)].forEach(function (item, index) {
    stream.write(index + '\n');
  });
  console.log(new Date().toISOString());
  stream.end();
}

export default log;
