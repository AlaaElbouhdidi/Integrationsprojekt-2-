const execSync = require('child_process').execSync;

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);
const isMain = process.argv[5] === 'main';
const baseSha = isMain ? 'main~1' : 'main';

let affected = `npx nx print-affected --base=${baseSha} --target=${target}`
affected = execSync(affected).toString('utf-8');

const array = JSON.parse(affected).tasks.map(task => task.target.project).sort();

const sliceSize = Math.floor(array.length / jobCount);
let projects =
  jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

projects = projects.join(',')

const cmd =`npx nx run-many --target=${target} --projects=${projects} --parallel ${restArgs()}`

if (projects.length > 0) execSync(cmd, { stdio: [0, 1, 2] });

function restArgs() {
  return process.argv.slice(6).map(arg => `"${arg}"`).join(' ');
}
