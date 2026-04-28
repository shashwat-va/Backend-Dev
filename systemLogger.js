const fs = require('fs');
const os = require('os');
const path = require('path');

const logFile = path.join(__dirname, 'system.log');
const intervalMs = 5000;

function getSystemInfo() {
  return {
    timestamp: new Date().toISOString(),
    platform: os.platform(),
    release: os.release(),
    architecture: os.arch(),
    cpuCount: os.cpus().length,
    totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
    freeMemoryMB: Math.round(os.freemem() / 1024 / 1024)
  };
}

function logInfo() {
  const info = getSystemInfo();
  const line = `${info.timestamp} | platform=${info.platform} | arch=${info.architecture} | release=${info.release} | cpus=${info.cpuCount} | totalMemoryMB=${info.totalMemoryMB} | freeMemoryMB=${info.freeMemoryMB}\n`;
  fs.appendFile(logFile, line, (err) => {
    if (err) {
      console.error('Failed to write system log:', err.message);
    }
  });
}

console.log(`Starting system logger; writing to ${logFile} every ${intervalMs / 1000} seconds.`);
const timer = setInterval(logInfo, intervalMs);
logInfo();

process.on('SIGINT', () => {
  clearInterval(timer);
  console.log('System logger stopped.');
  process.exit(0);
});
