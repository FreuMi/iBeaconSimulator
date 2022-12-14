// Only works with hci0

const ibeacon = require("./iBeacon")
async function main() {
  let mac = await ibeacon.execShellCommand('sudo hciconfig');
  mac = mac.match(/([0-9a-fA-F]{2}\W){6}/gi);
  console.log('MAC of Beacon is', mac[0]);
  // Start Beacon
  await ibeacon.startBeacon();
  // Wait 20 sec
  await sleep(20000);
  // Stop Beacon
  await ibeacon.stopBeacon();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



main();
