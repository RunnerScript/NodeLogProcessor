import chalk from "chalk"
export function processLog(line) {
    if (line.include('ERROR')) {
        process.nextTick(() => {
            console.log(chalk.red(`Error: ${line}`));
        });
    }
    else if (line.include('WARN')) {
        setImmediate(() => { console.log(chalk.yellow(`Warning: ${line}`)); });
    }
    else {
        console.log(chalk.green(line));
    }

}