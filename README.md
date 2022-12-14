# A simple iBeacon Simulator for Linux
Node.js software that provides two simple functions, one to start a Bluetooth Low Energy iBeacon and one to stop an iBeacon in a convenient way.
The created iBeacon has a hardcoded advertising interval of 100 milliseconds.

### Compatibility
Works only on Linux with BlueZ.
Tested with Ubuntu 22.04 LTS.

Uses hcitool so make sure that it is installed.

### Example
example.js starts an iBeacon for 20 seconds and after that stops the iBeacon again.
