console.time("executionTime");
var fs = require("fs");
var os = require("os"); // used to get the OS End of Line character(s)

fs.readFile("input", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  var arrayData = data.split(os.EOL);

  // Used to count the number of times a character appears in a string
  const charCount = (c, str) => {
    return str.replace(new RegExp('[^' + c + ']', 'g'), '').length;
  }

  var twoFlagCounter = 0;
  var threeFlagCounter = 0;

  //console.log(arrayData);
    var sortedLine = arrayData[j].split('').sort();
    var twoFlag = false;
    var threeFlag = false;
    for (var i = 0; i < sortedLine.length; i++) {
      var numOfRepeats = charCount(sortedLine[i], arrayData[j]);

      if (numOfRepeats == 2) {
        twoFlag = true;
      } else if (numOfRepeats == 3) {
        threeFlag = true;
      }
      //console.log(`${sortedLine[i]} shows up ${numOfRepeats} times.`);
    }
    if (twoFlag) {
      twoFlagCounter++;
    }
    if (threeFlag) {
      threeFlagCounter++;
    }
  }
  console.log("Final Results...");
  console.log(twoFlagCounter);
  console.log(threeFlagCounter);
  var partOneAnswer = twoFlagCounter * threeFlagCounter;
  console.log(`Part One Answer is: ${twoFlagCounter} x ${threeFlagCounter} = ${partOneAnswer}`)

  // From here on it's just brute forced more than usual...
  var firstString;
  var secondString;
  var posOfMismatch;
  var foundTheString = false;
  for (var i = 0; i < arrayData.length; i++) {
    firstString = arrayData[i];
    for (var j = 0; j < arrayData.length; j++) {
      secondString = arrayData[j];
      var minLoopingLength = Math.min(firstString.length, secondString.length);
      var mismatchCounter = 0;
      foundTheString = false;
      for (var k = 0; k < minLoopingLength; k++) {
        if (firstString[k] !== secondString[k]) {
          mismatchCounter++;
          posOfMismatch = k;
          //console.log(posOfMismatch);
          if (mismatchCounter > 1) {
            break; // give up
          }
        }
      }
      if (mismatchCounter == 1) {
        foundTheString = true;
      }
      if (foundTheString) {
        break;
      }
    }
    if (foundTheString) {
      break;
    }
  }

  console.log(`${firstString} and ${secondString} are the matching strings!`);
  console.log(`Position ${posOfMismatch} is the mismatched position!`);
  console.log(`Excluding the position of the mismatched character, the strings are actually...`);

  firstString = firstString.split('');
  secondString = secondString.split('');

  firstString.splice(posOfMismatch, 1);
  secondString.splice(posOfMismatch, 1);

  firstString = firstString.join('');
  secondString = secondString.join('');

  if (firstString === secondString) {
    console.log(`VERIFIED to be: ${firstString} and ${secondString}`);
  } else {
    console.log(`NOT VERIFIED to be: ${firstString} and ${secondString} -- something must have went wrong!`);
  }

});
console.timeEnd("executionTime");