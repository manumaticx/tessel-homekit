/*
 * This is a modified version of the BridgedCore of HAP-NodeJS
 * See: https://github.com/KhaosT/HAP-NodeJS
 */

var fs = require('fs');
var path = require('path');
var storage = require('node-persist');
var HapNode = require('hap-nodejs');
var uuid = require('./').uuid;
var Bridge = require('./').Bridge;
var Accessory = require('./').Accessory;
var accessoryLoader = require('./lib/AccessoryLoader');

var TesselHAP = function(){

  var bridgeName = "Tessel Bridge";

  console.log("Tessel HAP starting...");

  // Initialize our storage system
  storage.initSync();

  // Start by creating our Bridge which will host all loaded Accessories
  var bridge = new Bridge(bridgeName, uuid.generate(bridgeName));

  // Listen for bridge identification event
  bridge.on('identify', function(paired, callback) {
    console.log(bridgeName + " identify");
    callback(); // success
  });

  // Load up all accessories in the /accessories folder
  var dir = path.join(__dirname, "accessories");
  var accessories = accessoryLoader.loadDirectory(dir);

  // Add them all to the bridge
  accessories.forEach(function(accessory) {
    bridge.addBridgedAccessory(accessory);
  });

  // Publish the Bridge on the local network.
  bridge.publish({
    username: "CC:22:3D:E3:CE:F6",
    port: 51826,
    pincode: "031-45-154",
    category: Accessory.Categories.BRIDGE
  });
};

module.exports = TesselHAP;
