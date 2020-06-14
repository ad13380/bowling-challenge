'use strict';

describe('Score', function () {
  var score

  beforeEach(function() {
    score = new Score();
  });

  describe('.frameSubScore', function() {
    var rollArray = [1, 2, 1, 9, 3, 4, 10, 1, 3];

    it('returns the score for an individual regular frame', function () {
      var rollIndex = 1;
      expect(score.frameSubScore(rollIndex, rollArray)).toEqual(3);
    });

    it('returns the score for an individual spare', function () {
      var rollIndex = 3;
      expect(score.frameSubScore(rollIndex, rollArray)).toEqual(13);
    });

    it('returns the score for an individual strike', function () {
      var rollIndex = 6;
      expect(score.frameSubScore(rollIndex, rollArray)).toEqual(14);
    });

    it('returns 0 when given a rollIndex of -1', function () {
      var rollIndex = -1;
      expect(score.frameSubScore(rollIndex, rollArray)).toEqual(0);
    });
  });

  describe('.assignScoreOrder', function() {
    it('processes the score order for a non-frame ending roll', function () {
      var rollArray = [1]
      score.assignScoreOrder(rollArray)
      expect(score.scoreOrder).toEqual([[-1]]);
    });

    it('processes the score order for a regular frame ending roll', function () {
      var rollArray = [5,4,3,2]
      for (var i = 0; i < rollArray.length; i++ ) {
        var sampleArray = rollArray.slice(0, i + 1);
        score.assignScoreOrder(sampleArray);
      }
      expect(score.scoreOrder).toEqual([[-1], [1], [-1], [3]])
    });

    it('processes the score order for a spare', function () {
      var rollArray = [5, 5, 3, 2]
      for (var i = 0; i < rollArray.length; i++ ) {
        var sampleArray = rollArray.slice(0, i + 1);
        score.assignScoreOrder(sampleArray);
      }
      expect(score.scoreOrder).toEqual([[-1], [-1], [1, -1], [3]])
    });

    it('processes the score order for a strike', function () {
      var rollArray = [5, 5, 3, 2, 10, 2, 3]
      var expectedResult = [[-1], [-1], [1, -1], [3], [-1], [-1, -1], [4, 6]]
      for (var i = 0; i < rollArray.length; i++ ) {
        var sampleArray = rollArray.slice(0, i + 1);
        score.assignScoreOrder(sampleArray);
      }
      expect(score.scoreOrder).toEqual(expectedResult)
    });

    //this is a test
    it('this is a test', function () {
      var rollArray = [3, 6, 8, 2, 7, 2, 6, 3, 9, 1, 10, 9, 1, 3, 6, 7, 3, 10, 10, 6]
      for (var i = 0; i < rollArray.length; i++ ) {
        var sampleArray = rollArray.slice(0, i + 1);
        score.assignScoreOrder(sampleArray);
        console.log(score.frameScore(score.scoreOrder[i], rollArray));
      }
    });


  });
});