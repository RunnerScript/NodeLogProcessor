import fs from 'fs';
import readline from 'readline';

export function readLogs(filePath, processLog) {
    const logStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: logStream,
        output: process.output,
        terminal: false
    });
    rl.on('line', (line) => processLog(line));
    rl.on('close', () => console.log("logs are completed."));
}