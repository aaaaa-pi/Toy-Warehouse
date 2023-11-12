const chokidar = require("chokidar");
const { exec, spawn } = require("child_process");

let childProcess;
let debounceRestart = debounce(restart,500);
chokidar.watch(["main.js"]).on("all", (event,path) => {
    console.log(event,path);

    debounceRestart();
});

function restart(){
    console.log("restart");
    childProcess && childProcess.kill();

    childProcess = spawn("node", ["main.js"], {
        stdio: [process.stdin,process.stdout,process.stderr],
    });
    // childProcess = exec("node main.js", (err,stdout) => {
    //     console.log(stdout);
    // });
};

function debounce(fn,delay){
    let id;
    return () => {
        clearTimeout(id);

        id = setTimeout(() => {
            fn();
        },delay);
    };
};
