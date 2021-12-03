import { execSync } from 'child_process';

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);

let affected = `npx nx print-affected --base=HEAD~1 --target=${target}`
affected = execSync(affected).toString('utf-8');

const array = JSON.parse(affected).tasks.map(task => task.target.project).sort();

const sliceSize = Math.floor(array.length / jobCount);

const projects = jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

const cmd = `npx nx run-many --target=${target} --projects=${projects.join(',')} --parallel ${restArgs()}`

if (projects.length > 0) execSync(cmd, { stdio: [0, 1, 2] });

function restArgs() {
  return process.argv.slice(6).map(arg => `"${arg}"`).join(' ');
}
