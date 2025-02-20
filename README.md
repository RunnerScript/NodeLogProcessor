# Logger Project

## Overview
The Logger Project is a Node.js application that processes log files and analyzes error occurrences using worker threads for efficient computation.

## Features
- Reads log files asynchronously.
- Processes log data to count critical errors.
- Utilizes Node.js worker threads for parallel processing.
- Stores processed results in a structured JSON file.

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd node-log-processor
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Place the log file (`mylogs.txt`) in the project root directory.
2. Start the application:
   ```sh
   npm start
   ```
3. Processed logs will be stored in `./processedLogs/processed.json`.

## Project Structure
```
node-log-processor/
│-- index.js
│-- package.json
│-- utils/
│   │-- fileReader.js
│   │-- logProcessor.js
│-- workers/
│   │-- logWorker.js
│-- processedLogs/
│   │-- processed.json (generated output)
```

## How It Works
1. **`index.js`** reads the log file and sends log lines to the worker thread.
2. **`logWorker.js`** receives the logs, filters error messages, and counts them.
3. The worker thread sends the error count back to the parent.
4. The parent process writes the result into `processed.json`.

## Code Flow
### **Parent Process (`index.js`)**
```js
setTimeout(() => {
    const worker = new Worker('./workers/logWorker.js');

    worker.on('message', (msg) => {
        console.log(`📊 Worker Result: ${msg.errors} critical errors found`);
        fs.writeFileSync('./processedLogs/processed.json', JSON.stringify(msg, null, 2));
    });

    worker.postMessage(logLines);
}, 2000);
```

### **Worker Process (`logWorker.js`)**
```js
parentPort.on('message', (logs) => {
    const errorCount = logs.filter((log) => log.includes('ERROR')).length;
    parentPort.postMessage({ errors: errorCount });
});
```

## Troubleshooting
- Ensure that `mylogs.txt` exists in the root directory.
- If you face module resolution errors, check the file extensions (`.js`) in import statements.
- Use absolute paths if relative imports cause issues.

## License
This project is open-source and available under the [MIT License](LICENSE).
