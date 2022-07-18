var words = [
  {"left_word": "BRAZIL", "right_word": "INDIA", "middle": [
    {"word": "SPAIN", "point": 50},
    {"word": "TURKEY", "point": 70}
  ]},
  {"left_word": "COLD", "right_word": "HOT", "middle": [
    {"word": "BOILING", "point": 80},
    {"word": "SUN", "point": 100},
    {"word": "WARM", "point": 60},
    {"word": "ICECREAM", "point": 20},
    {"word": "FIRE", "point": 90},
    {"word": "ANTARTICA", "point": 10},
    {"word": "SOUP", "point": 70}
  ]},
  {"left_word": "CHEAP", "right_word": "EXPENSIVE", "middle": [
    {"word": "YACHT", "point": 90},
    {"word": "BIGMAC", "point": 10},
    {"word": "ROLEX", "point": 80},
    {"word": "FREE", "point": 0},
    {"word": "GROCERY", "point": 80},
  ]},
  {"left_word": "SAFE", "right_word": "DANGER", "middle": [
    {"word": "SEATBELT", "point": 20},
    {"word": "HELMET", "point": 10},
    {"word": "SKYDIVING", "point": 80},
    {"word": "GUN", "point": 90},
    {"word": "DRIVING", "point": 60},
  ]}
];

var problem = getRandomLevel();
var solution = getRandomSolution();
var text = '';

function getRandomLevel() {
  return words[Math.floor(Math.random()*words.length)];
}

function getRandomSolution() {
  return problem['middle'][Math.floor(Math.random()*problem['middle'].length)];
}

function setBoard() {
  let left = document.getElementById("left_word");
  let right = document.getElementById("right_word");
  let progress = document.getElementById("progress");
  let board = document.getElementById("solution");
  
  left.innerHTML = problem['left_word'];
  right.innerHTML = problem['right_word'];
  progress.value = solution['point'];

  for (let i = 0; i < solution['word'].length; i++) {
    let box = document.createElement("span");
    box.className = "button is-active is-size-1 m-1";
    board.appendChild(box);
  }
}

function clearBoard() {
  $('#solution').empty();
  if (text == solution['word']) {
    problem = getRandomLevel();
    solution = getRandomSolution();
  }
  setBoard();
  text = '';
}

function getCurrentPos() {
  var current = text.length - 1;
  return current;
}

function getNextPos() {
  var current = text.length - 1;
  return current + 1;
}

function getLastPos() {
  return solution['word'].length - 1;
}

setBoard();

$(function() {
  $(window).keydown(function(e) {
    var key = e.which;
    if (key >= 65 && key <= 90) {
      var character = String.fromCharCode(key);
      var nextPos = getNextPos();
      $('#solution span:eq(' + nextPos + ')').text(character);
      text += character;
      if (getCurrentPos() == getLastPos()) {
        if (text == solution['word']) {
          $('#solution span').css('border-color', 'green');
        } else {
          $('#solution span').css('border-color', 'red');
        }
        setTimeout(clearBoard, 1000);
      }
    } else if (key == 8 && text.length > 0) {
      var currentPos = getCurrentPos();
      $('#solution span:eq(' + currentPos + ')').text('');
      text = text.slice(0, -1);
    }
  });
});