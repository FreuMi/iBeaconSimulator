async function startBeacon() {
  // Activate interface
  await execShellCommand('sudo hciconfig hci0 up');
  // Disable scan
  await execShellCommand('sudo hciconfig hci0 noscan');

  // Activate Beacon
  await execShellCommand(
    'sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 E2 0A 39 F4 73 F5 4B C4 A1 2F 17 D1 AD 07 A9 61 00 00 00 00 C8 00'
  );
  // Set ADV interval to 100 ms
  await execShellCommand(
    'sudo hcitool -i hci0 cmd 0x08 0x0006 A0 00 A0 00 03 00 00 00 00 00 00 00 00 07 00'
  );
  // Start ADV
  await execShellCommand('sudo hcitool -i hci0 cmd 0x08 0x000a 01');

  console.log('Beacon up');
}

async function stopBeacon() {
  // undo all of startBeacon
  await execShellCommand('sudo hciconfig hci0 noleadv');
  await execShellCommand('sudo hciconfig hci0 piscan');
  await execShellCommand('sudo hciconfig hci0 up down');

  console.log('Beacon down');
}

// Ececute shell command
function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

exports.stopBeacon = stopBeacon;
exports.startBeacon = startBeacon;
exports.execShellCommand = execShellCommand;



// Based on:
// https://github.com/dburr/linux-ibeacon/blob/master/ibeacon
// https://stackoverflow.com/questions/21124993/is-there-a-way-to-increase-ble-advertisement-frequency-in-bluez
// https://ali-dev.medium.com/how-to-use-promise-with-exec-in-node-js-a39c4d7bbf77
