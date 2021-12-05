import { execSync } from 'child_process';

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);
const isMain = process.argv[5] === 'main';
const baseSha = isMain ? 'main~1' : 'main';

interface Task {
    id: string;
    overrides: {};
    target: Target;
    command: string;
    outputs: [];
}

interface Target {
    project: string;
    target: string;
}

function restArgs() {
    return process.argv
        .slice(6)
        .map((arg) => `"${arg}"`)
        .join(' ');
}

let affected = `npx nx print-affected --base=${baseSha} --target=${target}`;
affected = execSync(affected).toString('utf-8');

const tasksArray: Task[] = JSON.parse(affected).tasks.sort();

let projectsArray = tasksArray.map(task => task.target.project);

const sliceSize = Math.floor(projectsArray.length / jobCount);

projectsArray =
    jobIndex < jobCount
        ? projectsArray.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
        : projectsArray.slice(sliceSize * (jobIndex - 1));

const projects = projectsArray.join(',');

const cmd =
    target !== 'e2e'
        ? `npx nx run-many --target=${target} --projects=${projects} --parallel ${restArgs()}`
        : `npx nx run-many --target=${target} --projects=${projects} ${restArgs()}`;

if (projects.length > 0) execSync(cmd, { stdio: [0, 1, 2] });
