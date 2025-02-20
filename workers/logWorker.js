
import { parentPort } from 'worker_threads';

parentPort.on('message', (logs) => {
    const errorCount = logs.filter((log) => log.include('ERROR')).length;
    parentPort.postMessage({ errors: errorCount });
});


