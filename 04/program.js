console.time("executionTime");
var fs = require("fs");
var os = require("os"); // used to get the OS End of Line character(s)

fs.readFile("input", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  var arrayData = data.split(os.EOL);

  // Steps:
  // Sort the list chronologically
  // Organize into Guards
  // Organize into Days for Guards
  // Iterate each guard...
  // Iterate each day for each guard...
  // Compare the minutes for each day for the guard and create an array that stores the number of times the minute occurs for sleeping
  // Figure out what to do from there....
  // Reminder/Note: "The guard falling asleep or waking up is always the one whose shift most recently started."
  const guards = [];
  class GuardEvent {
    constructor(dateVal, eventAction) {
      this.timestamp = dateVal;
      this.event = eventAction;
    }
  }

  class Guard {
    constructor(id) {
      this.id = id;
      this.timestamps = []; // stores GuardEvent item
    }
  }

  class initDataObj {
    constructor(timeKey, dataVal) {
      this.timeKey = timeKey;
      this.dataVal = dataVal;
      // Guard Details
      this.newGuard = dataVal.substring(0, 5) == 'Guard';
      if (this.newGuard) {
        this.newGuardID = dataVal.substring(7, dataVal.length - 13);
      } else {
        this.newGuardID = null;
      }

      // Timestamp Items
      this.year = parseInt(timeKey.substring(0, 4));
      this.month = parseInt(timeKey.substring(4, 6));
      this.day = parseInt(timeKey.substring(6, 8));
      this.hour = parseInt(timeKey.substring(8, 10));
      this.min = parseInt(timeKey.substring(10, 12));
    }

    getTimeStamp() {
      return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.min}`;
    }

  }

  //[1518-01-19 00:03] Guard #1021 begins shift

  // We need to "massage" the data into something that we can actually sort
  var dataEvents = [];
  for (var i = 0; i < arrayData.length; i++) {
    var timeKey = `${arrayData[i].substring(1, 5)}${arrayData[i].substring(6, 8)}${arrayData[i].substring(9, 11)}${arrayData[i].substring(12, 14)}${arrayData[i].substring(15, 17)}`;
    var dataVal = `${arrayData[i].substring(19)}`;
    // console.log(timeKey);
    // console.log(dataVal);
    var temp = new initDataObj(timeKey, dataVal);
    dataEvents.push(temp);
  }

  dataEvents.sort((a, b) => parseInt(a.timeKey) - parseInt(b.timeKey));
  var currentGuard;
  var currentStatus = 0; // 0 for awake, 1 for sleeping
  var startSleepTime;
  var endSleepTime;
  var guardSleepTable = []; // initial index is the guard id
  var guardTotalSleepCounter = []; // index is the guard id
  for (var i = 0; i < dataEvents.length; i++) {
    if (dataEvents[i].newGuard) {
      if (currentGuard != null) {
        // calculate time slept and store it for the previous guard  
        for (var j = startSleepTime; j < endSleepTime; j++) {
          guardSleepTable[currentGuard][j]++; // set it as sleeping
          guardTotalSleepCounter[currentGuard]++;
        }
        //console.log(guardSleepTable[currentGuard]);
      }
      // Reset these every time since it's now referring to a new guard
      startSleepTime = 0;
      endSleepTime = 0;
      currentGuard = dataEvents[i].newGuardID
      //console.log(`Guard #${currentGuard}: Begins Shift`);
      if (guardSleepTable[currentGuard] == null) {
        guardSleepTable[currentGuard] = (new Array(60)).fill(0);
        guardTotalSleepCounter[currentGuard] = 0;
      }
      currentStatus = 0;
    } else {
      //console.log(`Guard #${currentGuard}: ${dataEvents[i].dataVal}`);
      if (dataEvents[i].dataVal == 'falls asleep') {
        startSleepTime = dataEvents[i].min;
      } else if (dataEvents[i].dataVal == 'wakes up') {
        endSleepTime = dataEvents[i].min;
      }
    }

  }

  // Figure out WHICH guard has slept the most minutes
  var mostSleepiestGuard = {
    'id': null,
    'totalSlept': 0
  }
  for (var i = 0; i < guardTotalSleepCounter.length; i++) {
    if (guardTotalSleepCounter[i]) {
      if (guardTotalSleepCounter[i] > mostSleepiestGuard.totalSlept) {
        mostSleepiestGuard.id = i;
        mostSleepiestGuard.totalSlept = guardTotalSleepCounter[i];
      }
    }
  }

  console.log(`The sleepiest guard is Guard #${mostSleepiestGuard.id} with ${mostSleepiestGuard.totalSlept} minutes slept!`);
  // Now let's find out which minute they tend to sleep the most...
  var mostAsleepDuringMin = 0;
  for (var i = 0; i < 60; i++) {
    if (guardSleepTable[mostSleepiestGuard.id][i] > mostAsleepDuringMin) {
      mostAsleepDuringMin = guardSleepTable[mostSleepiestGuard.id][i];
    }
  }
  mostSleepiestGuard.mostAsleepDuringMin = mostAsleepDuringMin;

  console.log(`Guard #${mostSleepiestGuard.id} is most likely asleep during minute: ${mostSleepiestGuard.mostAsleepDuringMin}!`);

  console.log(`SO! For part 1: the value is calculated as GuardID * SleepiestMin, therefore...`);
  console.log(`${mostSleepiestGuard.id} * ${mostSleepiestGuard.mostAsleepDuringMin} => ${mostSleepiestGuard.id*mostSleepiestGuard.mostAsleepDuringMin}`);
  console.log(`WARNING: this solution is invalid...`);
});
console.timeEnd("executionTime");