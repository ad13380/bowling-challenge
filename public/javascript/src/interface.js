'use strict';

$(document).ready(function() {
  var score = new Score();

  updateScore();

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
      score.addRoll(btn_number);
      displayRoll(btn_number);
      updateScore();
    });
  }

  function updateScore() {
    $('#current_score').text(score.total())
  }

  function displayRoll(rollValue) {
    var htmlText = `<p>${rollValue} - ${score.total()}</p>`
    $(htmlText).insertBefore('#roll_values')
  }
});