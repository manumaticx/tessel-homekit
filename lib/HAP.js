var Accessory = require('./Accessory.js').Accessory;
var Bridge = require('./Bridge.js').Bridge;
var Camera = require('./Camera.js').Camera;
var Service = require('./Service.js').Service;
var Characteristic = require('./Characteristic.js').Characteristic;
var uuid = require('./util/uuid');
var AccessoryLoader = require('./AccessoryLoader.js');
var StreamController = require('./StreamController.js').StreamController;
var storage = require('node-persist');

// ensure Characteristic subclasses are defined
var HomeKitTypes = require('./gen/HomeKitTypes');

module.exports = {
  init: init,
  Accessory: Accessory,
  Bridge: Bridge,
  Camera: Camera,
  Service: Service,
  Characteristic: Characteristic,
  uuid: uuid,
  AccessoryLoader: AccessoryLoader,
  StreamController: StreamController
}

function init(storagePath) {
  // initialize our underlying storage system, passing on the directory if needed
  if (typeof storagePath !== 'undefined')
    storage.initSync({ dir: storagePath });
  else
    storage.initSync(); // use whatever is default
}
