'use strict';

$(document).ready(function() {
  var game = new Game();

  btnFunct(0);
  btnFunct(1);
  btnFunct(2);
  btnFunct(3);
  btnFunct(4);
  btnFunct(5);
  btnFunct(6);
  btnFunct(7);
  btnFunct(8);
  btnFunct(9);
  btnFunct(10);

  function btnFunct(btn_number) {
    $(`#button_${btn_number}`).on('click', function() {
      game.update(btn_number);
      updateScorecard(btn_number);
      checkEndGame();
    });
  }

  function updateScorecard(rollValue) {
    renderRoll(rollValue)
    rednerRollNumber()
    renderFrameNumber(rollValue)
    renderScore()
  }

  function rednerRollNumber() {
    $('#roll_number').append(game.rollNumber + '<br>')
  }

  function renderRoll(rollValue) {
    $('#roll_values').append(rollValue + '<br>')
  }

  function renderFrameNumber(rollValue) {
    var frame = game.displayFrame(rollValue)
    if (frame) { 
      $('#frame_number').append(frame + '<br>')
    } else {
      $('#frame_number').append('<br>')
    }  
  }

  function renderScore() {
    var score = game.displayScore()
    if (score) { 
      $('#roll_scores').append(score + '<br>')
    } else {
      $('#roll_scores').append('<br>')
    }   
  }

  function checkEndGame() {
    if (game.isEnd()) {
      $('#its_over').html('<h1>THATS IT, ITS OVER</h1>')
    }
  }
})
