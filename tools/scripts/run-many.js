"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var target = process.argv[2];
var jobIndex = Number(process.argv[3]);
var jobCount = Number(process.argv[4]);
var isMain = process.argv[5] === 'main';
var baseSha = isMain ? 'main~1' : 'main';
function restArgs() {
    return process.argv
        .slice(6)
        .map(function (arg) { return "\"".concat(arg, "\""); })
        .join(' ');
}
var affected = "npx nx print-affected --base=".concat(baseSha, " --target=").concat(target);
affected = (0, child_process_1.execSync)(affected).toString('utf-8');
var tasksArray = JSON.parse(affected).tasks.sort();
var projectsArray = tasksArray.map(function (task) { return task.target.project; });
var sliceSize = Math.floor(projectsArray.length / jobCount);
projectsArray =
    jobIndex < jobCount
        ? projectsArray.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
        : projectsArray.slice(sliceSize * (jobIndex - 1));
var projects = projectsArray.join(',');
var cmd = target !== 'e2e'
    ? "npx nx run-many --target=".concat(target, " --projects=").concat(projects, " --parallel ").concat(restArgs())
    : "npx nx run-many --target=".concat(target, " --projects=").concat(projects, " ").concat(restArgs());
if (projects.length > 0)
    (0, child_process_1.execSync)(cmd, { stdio: [0, 1, 2] });
//# sourceMappingURL=run-many.js.map
