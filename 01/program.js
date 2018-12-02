console.time("executionTime");
var fs = require("fs");
var os = require("os"); // used to get the OS End of Line character(s)

fs.readFile("input", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  var arrayData = data.split(os.EOL);
  var finalFreq = 0; // Result of summation of frequencies tuned
  var freqRepeat = [];
  var freqRepeatFirst;

  function checkForRepeat(inputIndex, array) {
    if (freqRepeat[finalFreq] == null) {
      //console.log("setting un-null for:",finalFreq);
      freqRepeat[finalFreq] = 0;
    } else {
      return finalFreq;
    }
    return null;
  }
  var fileLoopCounter = 0;
  while (true) {
    fileLoopCounter++;
    for (var i = 0; i < arrayData.length; i++) {
      if (arrayData[i]) {
        finalFreq += parseInt(arrayData[i], 10);
        //console.log(finalFreq);
        // code to calculate freq sum repeats
        var result = checkForRepeat(finalFreq, freqRepeat);
        if (!freqRepeatFirst && result) {
          freqRepeatFirst = result;
        }
      }
    }
    if (fileLoopCounter == 1) { // we only really need the first sum for the first star
      console.log(`The sum of ${fileLoopCounter} run(s) is:`, finalFreq);
    }

    if (freqRepeatFirst || fileLoopCounter > 99999) {
      break; // break when you get to the answer of it this has run for way too long...
    }
  }

  if (freqRepeatFirst) {
    console.log(`First repeat after looping ${fileLoopCounter} times was: `, freqRepeatFirst);
  }
});
console.timeEnd("executionTime");