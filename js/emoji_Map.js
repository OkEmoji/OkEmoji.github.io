var activeEmojis = [];


var dashID = "emoji-dashboard";
var totalOccurrences;
var sizeOfContainer;

/*
--------------------------------------------------------------------------------
Emoji Map.js
--------------------------------------------------------------------------------
Author: J. Patrick Taggart
================================================================================
*/

/*
--------------------------------------------------------------------------------
Emoji Creation Functions
--------------------------------------------------------------------------------
*/

// Create a div to contain elements related to a particular emoji
// *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
function createEmojiDiv(emojiData) {
  var emojiDiv = document.createElement('div');
  emojiDiv.setAttribute('class','emoji-container');
  emojiDiv.style.position = 'absolute';

  // Add the emoji image element as a child
  emojiDiv.appendChild(createEmojiImage(emojiData));

  // Keep track of emojis being displayed
  activeEmojis.push(emojiData.emojiName);

  return emojiDiv;
};

// *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
function createEmojiImage(emojiData) {
  // Assume file path is img/emojiName
  var img = document.createElement('img');
  img.setAttribute('id', emojiData.emojiName);
  img.setAttribute('src', 'emoji_resources/' + emojiData.emojiName + '.svg');

  //ANTONIO IS DOING CHANGES AND STUFF HERE
  var dashboard = document.getElementById(dashID);
  var maxSideLength = Math.min(dashboard.clientHeight / 4, dashboard.clientWidth / 7);

  var size = (maxSideLength * emojiData.occurrences / totalOccurrences);
  img.style.height = size + "px";
  img.style.width = size + "px";

  return img;
};

// LEGACY CODE
// Make the emoji dashboard with a banner at top (and bottom?)
function createDashboard() {
  // Could maybe make a call to refresh?
  // get data from database
  var dashboard = document.getElementById(dashID);
  var data = JSON.parse(pullEmojiData());

  //console.log("total count: " + data.totalOccurrences);
  totalOccurrences = parseInt(data.totalOccurrences);
  sizeOfContainer = Math.min(dashboard.clientHeight, dashboard.clientWidth);

  // Populate dashboard with emoji divs (could maybe place them in a table later)
  var numEmojis = data.emojis.length;
  for (var i = 0; i < numEmojis; ++i) {
    dashboard.appendChild(createEmojiDiv(data.emojis[i]));
  }

  setTimeout(refresh, 5000);
};

/*
--------------------------------------------------------------------------------
Dashboard functions
--------------------------------------------------------------------------------
*/

// Updates the sizes of emojis on screen
// *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
function reorder(data) {
  // Reorder emojis on screen and play a notification noise when emoji resized
  activeEmojis.sort(function(a,b) {
    var a1 = parseInt(document.getElementById(a).style.width.substring(0,  document.getElementById(a).style.width.length - 2));
    var b1 = parseInt(document.getElementById(b).style.width.substring(0, document.getElementById(b).style.width.length - 2));

    return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
  });
  activeEmojis.reverse();

  var length = activeEmojis.length;
  var largest = parseInt(document.getElementById(activeEmojis[0]).style.width.substring(0,  document.getElementById(activeEmojis[0]).style.width.length - 2));
  console.log("largest: " + largest);

  for (var i = 0; i < length; ++i) {
    placeEmoji(activeEmojis[i], i, largest);
  }

  // In future could add function to allow emojis to float
};

// Places an emoji on the display area
function placeEmoji(emojiName, index, largest) {
  var dashboard = document.getElementById(dashID);
  var maxSideLength = Math.min(dashboard.clientHeight / 4, dashboard.clientWidth / 7);
  var topOfDashboard = document.getElementById(dashID).getBoundingClientRect().top - 75;
  var leftSideOffset = Math.max(0, (dashboard.clientWidth - dashboard.clientHeight) / 7);

  //console.log('LOOKAME: ratio =' + document.getElementById(emojiName).style.width.substring(0,  document.getElementById(activeEmojis[0]).style.width.length - 2) / largest);

  var width = (document.getElementById(emojiName).style.width.substring(0,  document.getElementById(emojiName).style.width.length - 2) / largest) * maxSideLength;
  var height = (document.getElementById(emojiName).style.height.substring(0,  document.getElementById(emojiName).style.height.length - 2) / largest) * maxSideLength;

  document.getElementById(emojiName).style.width = width + 'px';
  document.getElementById(emojiName).style.height = height + 'px';

  switch(index) {
    case 0:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 3 + 'px';
      break;
    case 1:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 4 + 'px';
      break;
    case 2:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 2 + 'px';
      break;
    case 3:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = (maxSideLength - width)/2 + leftSideOffset + maxSideLength * 3 + 'px';
      break;
    case 4:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = (maxSideLength - width)/2 + leftSideOffset + maxSideLength * 3 + 'px';
      break;
    case 5:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 2 + 'px';
      break;
    case 6:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 4 + 'px';
      break;
    case 7:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 2 + 'px';
      break;
    case 8:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 4 + 'px';
      break;
    case 9:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 1 + 'px';
      break;
    case 10:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 5 + 'px';
      break;
    case 11:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 1 + 'px';
      break;
    case 12:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 5 + 'px';
      break;
    case 13:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 1 + 'px';
      break;
    case 14:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 5 + 'px';
      break;
    case 15:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = (maxSideLength - width)/2 + leftSideOffset + maxSideLength * 3 + 'px';
      break;
    case 16:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 2 + 'px';
      break;
    case 17:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 4 + 'px';
      break;
    case 18:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 1 + 'px';
      break;
    case 19:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 5 + 'px';
      break;
    case 20:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 0 + 'px';
      break;
    case 21:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 3 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 6 + 'px';
      break;
    case 22:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 0 + 'px';
      break;
    case 23:
            document.getElementById(emojiName).parentNode.style.top = topOfDashboard + maxSideLength * 2 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 6 + 'px';
      break;
    case 24:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 0 + 'px';
      break;
    case 25:
            document.getElementById(emojiName).parentNode.style.top = (maxSideLength - height)/2 + topOfDashboard + maxSideLength * 1 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 6 + 'px';
      break;
    case 26:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = maxSideLength - width + leftSideOffset + maxSideLength * 0 + 'px';
      break;
    case 27:
            document.getElementById(emojiName).parentNode.style.top = maxSideLength - height + topOfDashboard + maxSideLength * 0 + 'px';
            document.getElementById(emojiName).parentNode.style.left = leftSideOffset + maxSideLength * 6 + 'px';
      break;

  }

};

function resize(data) {
  // Resize all elements and notify when changes occur
  var numEmojis = data.emojis.length;

  var dashboard = document.getElementById(dashID);
  sizeOfContainer = Math.min(dashboard.clientHeight, dashboard.clientWidth);
  totalOccurrences = data.totalOccurrences;

  // Loop through all elements passed from database
  //var oldEmojis = activeEmojis;
  //activeEmojis = [];
  for (var i = 0; i < numEmojis; ++i) {
    console.log(data.emojis[i].emojiName);
    var element = document.getElementById(data.emojis[i].emojiName);
    if ( element !== null) {
      //ANTONIO IS DOING CHANGES AND STUFF HERE
      console.log("element found");
      var maxSideLength = Math.min(dashboard.clientHeight / 4, dashboard.clientWidth / 7);
      var size = (maxSideLength * data.emojis[i].occurrences / totalOccurrences); //Might need to redefine the globals?

      // Check if element has changed size between iterations
      // If they havent changed size then they don't need to be adjusted
      if (Math.round(size) !== element.width) {
        notify(data.emojis[i], size, element.size);

        element.style.width = size + 'px';
        element.style.height = size + 'px';


      }
      //activeEmojis.push(element.getAttribute('id'));
      //oldEmojis.splice(oldEmojis.indexOf(data.emojis[i].emojiName), 1);
    } else {
      // Add a new element to the document
      emojiDiv = createEmojiDiv(data.emojis[i]);
      dashboard.appendChild(emojiDiv);
      notify(data.emojis[i], emojiDiv.style.height, 0);
    }
  }

  numEmojis = activeEmojis.length;
  for (var i = 0; i < numEmojis; ++i) {
    var element = document.getElementById(activeEmojis[i]);
    var maxSideLength = Math.min(dashboard.clientHeight / 4, dashboard.clientWidth / 7);
    var size = (maxSideLength * emojiTotals[parseEmojiID(activeEmojis[i]) - 1] / totalOccurrences);
    if (Math.round(size) !== element.width) {
      element.style.width = size + 'px';
      element.style.height = size + 'px';
    }
  }

  console.log('At end of resize: active emojis below');
  console.log(activeEmojis);

  // clear old elements
  // var oldLength = oldEmojis.length;
  // console.log('Deleting: ' + oldLength);
  // for (var i = 0; i < oldLength; ++i) {
  //   var element = document.getElementById(oldEmojis[i]);
  //   console.log('clearing: ' + oldEmojis[i]);
  //
  //   // Need to remove image and div
  //   element.parentNode.parentNode.removeChild(element.parentNode);
  // }
};

function notify(emojiData, newSize, oldSize) {
  //Make some noise and play an animation
  // console.log(emojiData.emojiName);
  playSound(emojiData.emojiName);
};

// Function to refresh data pulled from database
// *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
function refresh(jsonPackage) {
  var data = JSON.parse(jsonPackage);

  resize(data);
  reorder(data);
};


/*
--------------------------------------------------------------------------------
Database interactivity functions
--------------------------------------------------------------------------------
*/
function pullEmojiData() {
  // *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
  // Access database and pull information

  // Return data
  // if (dummyCounter >= 2) {
  //   dummyCounter = 0;
  // } else {
  //   ++dummyCounter;
  // }
  // return dummyDataSet[dummyCounter];
};

// *** NO ERROR HANDLING CURRENTLY IMPLEMENTED
function playSound(filename) {
  document.getElementById(filename).innerHTML='<audio autoplay="autoplay"><source src="./sounds/' + filename + '.mp3" type="audio/mpeg" /><source src="./sounds/' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="./sounds/' + filename +'.mp3" /></audio>';
};

window.onload = function() { refresh(); };

//window.onresize = function(event) { forceRefresh(); }; //refresh(); };

/*
--------------------------------------------------------------------------------
Functions and data for testing
--------------------------------------------------------------------------------
*/
var dummyCounter = 0;
var dummyData = '{ "totalOccurrences": 1160, ' + '"emojis": [{ "emojiName": "happy", "occurrences": 190 }, { "emojiName": "angry", "occurrences": 100 }, { "emojiName": "ahhh", "occurrences": 70 }, { "emojiName": "crying", "occurrences": 100 }, { "emojiName": "ded", "occurrences": 100 }, { "emojiName": "ehh", "occurrences": 100 }, { "emojiName": "embarassed", "occurrences": 100 }, { "emojiName": "glasses", "occurrences": 100 }, { "emojiName": "halo", "occurrences": 100 }, { "emojiName": "kiss", "occurrences": 100 }, { "emojiName": "happyblush", "occurrences": 100 }]' + '}';
var dummyData2 = '{ "totalOccurrences": 395, ' + '"emojis": [{ "emojiName": "happy", "occurrences": 195 }, { "emojiName": "angry", "occurrences": 100 }]' + '}';
var dummyData3 = '{ "totalOccurrences": 200, ' + '"emojis": [{ "emojiName": "happy", "occurrences": 200 }]' + '}';
var dummyDataSet = [dummyData, dummyData2, dummyData3];
