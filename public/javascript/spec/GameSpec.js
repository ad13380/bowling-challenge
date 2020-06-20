'use strict';

describe('Game', function () {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe('.update', function() { 
    it('updates the frame count', function() {
      var rollValues = [3, 7, 10, 2, 7, 5]
      for (var i = 0; i < rollValues.length; i++) {
        game.update(rollValues[i]);
      }
      expect(game.frameNumber).toEqual(4);
    });
  });

  describe('.displayScore', function() { 
    it('does not display a score of 0', function() {
      game.update(0);
      expect(game.displayScore()).toEqual(null);
    });

    it('only displays unique scores', function() {
      var rollValues = [3, 6, 8, 2, 7]
      var expectedResult = [null, 9, null, null, 26]
      for (var i = 0; i < rollValues.length; i++) {
        game.update(rollValues[i]);
        expect(game.displayScore()).toEqual(expectedResult[i]);
      }
    });
  });

  describe('.displayFrame', function() { 
    it('only displays unique frames', function() {
      var rollValues = [3, 7, 10, 2, 7, 5]
      var expectedResult = [1, null, 2, 3, null, 4]
      for (var i = 0; i < rollValues.length; i++) {
        game.update(rollValues[i]);
        expect(game.displayFrame(rollValues[i])).toEqual(expectedResult[i])
      }
    });
  });

  describe('.isEnd', function() { 
    it('returns true when the game has ended', function() {
      var rollValues = Array(12).fill(10);
      for (var i = 0; i < rollValues.length; i++) {
        expect(game.isEnd()).toBe(false);
        game.update(rollValues[i]);
      }
      expect(game.isEnd()).toBe(true);
    });
  });
});