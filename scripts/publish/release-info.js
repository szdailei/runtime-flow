/* eslint-disable camelcase */
import { readPackageUp } from 'read-pkg-up';

async function releaseInfo() {
  const { packageJson } = await readPackageUp();
  const { repository, version, files } = packageJson;

  const fields = repository.url.split('/');
  const owner = fields[fields.length - 2];
  const repoWithGit = fields[fields.length - 1];
  const repo = repoWithGit.slice(0, repoWithGit.length - 4);

  const tag_name = `v${version}`;
  const date = new Date();
  const name = `${tag_name} (${date.toDateString()})`;
  const releaseNotefileName = `./RELEASE_NOTE${`_${version}`}.md`;

  return { repo, owner, version, tag_name, name, files, releaseNotefileName };
}

export default releaseInfo;
