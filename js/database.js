var emojiDatabase = new Firebase('https://pinpoint-android-289be.firebaseio.com');

var emojiTotals = Array.apply(null, Array(28)).map(Number.prototype.valueOf,0);
var mostRecent = null;
var deleteTime = null; // Not currently supported

emojiDatabase.on('value', function (snapshot) {
  proccessEmojiData(snapshot.val());
});

function proccessEmojiData(data) {
  console.log('Most recent: ' + mostRecent);
  console.log(data);

  var updatedEmojis = [];
  for (var element in data) {
    var emojiDate = new Date(data[element]._date);
    if (emojiDate > mostRecent) {
      console.log("Updating emoji");
      // Emoji date more recent record its value
      emojiTotals[parseInt(data[element]._name) - 1] += 1;

      var emojiNum = parseInt(data[element]._name);
      if (updatedEmojis.indexOf(emojiNum) === -1) {
        updatedEmojis.push(emojiNum);
      }
      mostRecent = emojiDate;
    }
  }

  console.log(updatedEmojis);
  var jsonPackage = packageData(updatedEmojis);

  issueRefresh(jsonPackage);
};

function packageData(updated) {
  var totalOccurrences = 0;
  var length = updated.length;
  var totalLength = emojiTotals.length;

  var packagedData = '{';
  for (var i = 0; i < totalLength; ++i) {
    console.log(i + ": " + emojiTotals[i]);
    totalOccurrences += emojiTotals[i];
  }
  packagedData += '"totalOccurrences": ' + totalOccurrences + ', ';

  var emojiElements = '"emojis": [';
  for (var i = 0; i < length; ++i) {
    if (i === length - 1) {
      emojiElements += '{"emojiName": "' + parseEmojiNumber(updated[i]) + '", \
        "occurrences": ' + emojiTotals[updated[i] - 1] + '}';
    } else {
      emojiElements += '{"emojiName": "' + parseEmojiNumber(updated[i]) + '", \
        "occurrences": ' + emojiTotals[updated[i] - 1] + '},';
    }
  }
  packagedData += emojiElements + ']}';

  console.log(packagedData);
  return packagedData;
};

function issueRefresh(jsonPackage) {
  refresh(jsonPackage);
  updateHeader();
};

function updateHeader() {
  var i = Math.floor(Math.random() * 28);
  var occurrences = emojiTotals[i];
  var emojiName = parseEmojiNumber(i + 1);

  document.getElementById('occurrences').innerHTML = occurrences;
  document.getElementById('emojiName').setAttribute('src', 'emoji_resources/' + emojiName + '.svg');
  document.getElementById('emojiName').setAttribute('alt', emojiName);
};

function forceRefresh() {
  var totalOccurrences = 0;
  var totalLength = emojiTotals.length;
  for (var i = 0; i < totalLength; ++i) {
    totalOccurrences += emojiTotals[i];
  }
  return '{"totalOccurences": ' + totalOccurrences + ', "emojis": []}'
};

function parseEmojiNumber(num) {
  switch (num)
        {
            case 1: return 'ahhh';
            case 2: return 'angry';
            case 3: return 'crying';
            case 4: return 'ded';
            case 5: return 'ehh';
            case 6: return 'embarassed';
            case 7: return 'glasses';

            case 8: return 'halo';
            case 9: return 'happy';
            case 10: return 'happyblush';
            case 11: return 'kiss';
            case 12: return 'laughingcrying';
            case 13: return 'love';
            case 14: return 'lowkey';

            case 15: return 'nocomment';
            case 16: return 'ohyou';
            case 17: return 'saddissapointed';
            case 18: return 'sadfrustrated';
            case 19: return 'yikes';
            case 20: return 'sick';
            case 21: return 'sideeye';

            case 22: return 'sleep';
            case 23: return 'steaming';
            case 24: return 'suggestive';
            case 25: return 'tongue';
            case 26: return 'unhappy';
            case 27: return 'vhappy';
            case 28: return 'wow';
        }
};

function parseEmojiID(emojiName) {
  switch (emojiName)
        {
            case 'ahhh': return 1;
            case 'angry': return 2;
            case 'crying': return 3;
            case 'ded': return 4;
            case 'ehh': return 5;
            case 'embarassed': return 6;
            case 'glasses': return 7;

            case 'halo': return 8;
            case 'happy': return 9;
            case 'happyblush': return 10;
            case 'kiss': return 11;
            case 'laughingcrying': return 12;
            case 'love': return 13;
            case 'lowkey': return 14;

            case 'nocomment': return 15;
            case 'ohyou': return 16;
            case 'saddissapointed': return 17;
            case 'sadfrustrated': return 18;
            case 'yikes': return 19;
            case 'sick': return 20;
            case 'sideeye': return 21;

            case 'sleep': return 22;
            case 'steaming': return 23;
            case 'suggestive': return 24;
            case 'tongue': return 25;
            case 'unhappy': return 26;
            case 'vhappy': return 27;
            case 'wow': return 28;
        }
};
