console.time("executionTime");
var fs = require("fs");
var os = require("os"); // used to get the OS End of Line character(s)

fs.readFile("input", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  var arrayData = data.split(os.EOL);

  // Steps:
  // Parse the string into JSON Array
  // Place everything into the 2D Fabric Array, mark each element with an Array of Numbers (The IDs)
  // Iterate the entire 2D fabric Array, if anything has more than 1 element, add +1 to a counter and return the result for part 1 of this problem.

  // GO!
  // Parse into JSON Object Array:
  class Claim {
    constructor(id, posX, posY, width, height) {
      this.id = parseInt(id);
      this.posX = parseInt(posX);
      this.posY = parseInt(posY);
      this.width = parseInt(width);
      this.height = parseInt(height);
    }

    getMaxDimension() {
      return {
        'maxHeight': this.height + this.posY,
        'maxWidth': this.width + this.posX
      };
    }

    toString() {
      // TODO if needed
    }
  }

  var claimList = [];
  // Example:
  //#65 @ 725,643: 29x22
  // Determine the max dimensions fabric will lay out on based on,
  // the height and width max based on the position + dimensions.
  var maxDimension = {
    'height': 0,
    'width': 0
  }
  for (var i = 0; i < arrayData.length; i++) {
    if (arrayData[i]) {
      // Split the line into an array...
      var currentLine = arrayData[i].split(/\s+/); // Split it by Whitespace
      // Clean up the values...
      var idVal = currentLine[0].replace('#', '');
      var tempPos = currentLine[2].split(',');
      tempPos[1] = tempPos[1].replace(':', '');
      var tempDimensions = currentLine[3].split('x');

      // Create the object
      var newObj = new Claim(idVal, tempPos[0], tempPos[1], tempDimensions[0], tempDimensions[1]);

      // Check if it extends the maxDimension or not
      var objMax = newObj.getMaxDimension();
      if (objMax.maxHeight > maxDimension.height) {
        maxDimension.height = objMax.maxHeight;
      }

      if (objMax.maxWidth > maxDimension.width) {
        maxDimension.width = objMax.maxWidth;
      }

      claimList.push(newObj);

    }


  }

  console.log('Max Dimensions', maxDimension);

  // Create the fabric2D Array the lazy way (was thinking of mapping but...)
  var fabric2DArray = [];
  for (var i = 0; i < maxDimension.height; i++) {
    for (var j = 0; j < maxDimension.width; j++) {
      fabric2DArray[i] = [];
    }
  }

  // Place everything into the 2D Fabric Array, mark each element with an Array of Numbers (The IDs)
  // This could probably have been done while creating the claimList array
  for (var i = 0; i < claimList.length; i++) {
    // height loop
    for (var j = 0; j < claimList[i].height; j++) {
      // width loop
      for (var k = 0; k < claimList[i].width; k++) {
        // plush the ID to this spot
        // Create a new array if it's null
        if (fabric2DArray[(claimList[i].posY + j)][(claimList[i].posX + k)] == null) {
          fabric2DArray[(claimList[i].posY + j)][(claimList[i].posX + k)] = [];
        }

        // Push this to the list
        fabric2DArray[(claimList[i].posY + j)][(claimList[i].posX + k)].push(claimList[i].id);
      }
    }
  }

  var sumValue = 0;
  for (var i = 0; i < fabric2DArray.length; i++) {
    var thisLine = fabric2DArray[i].map(x => x.length).filter(length => length > 1).filter(item => item !== null);
    sumValue += thisLine.length;
  }

  console.log(sumValue);

 


});
console.timeEnd("executionTime");