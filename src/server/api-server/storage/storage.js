import fs from 'fs';
import path from 'path';

const storageConfig = {
  root: null,
};

function storage() {}

storage.getStorageRoot = () => storageConfig.root;

storage.setStorageRoot = (root) => {
  storageConfig.root = root;
};

storage.getFile = async (relativeFileName, format) => {
  const fileName = path.join(storageConfig.root, relativeFileName);
  return fs.promises.readFile(fileName, format || 'utf8');
};

storage.getFileList = async (relativeDirName) => {
  const dirName = path.join(storageConfig.root, relativeDirName);
  const files = await fs.promises.readdir(dirName);
  const fileNames = [];
  for (let i = 0; i < files.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const stats = await fs.promises.stat(path.join(dirName, files[i]));
    if (stats.isFile()) {
      fileNames.push(files[i]);
    }
  }
  return fileNames;
};

export default storage;
