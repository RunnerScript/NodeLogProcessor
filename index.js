import { readLogs } from './utils/fileReader';
import { processLog } from './utils/logProcessor';
import path from path;
import { fileUrlToPath } from 'url';
import { parentPort, Worker } from 'worker_threads';

const __filename = fileUrlToPath(path(import.meta.url));
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, 'mylogs.txt');
const logLines = [];
readLogs(logFilePath, (line) => {
    logLines.push(line);
    processLog(line);
});

const worker = new Worker('./workers/logWorker.js');
worker.postMessage(logLines);
worker.on('message', (msg) => {
    console.log(`Total Critical Errors ${msg.errors}`);
});


