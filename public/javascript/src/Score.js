class Score {
  constructor() {
    this.rollArray = [];
    this.scoreOrder = [];
    this.totalScore = 0;
    this.isEndOfFrame = false;
  }

  total() {
    return this.totalScore;
  }

  addRoll(rollValue) {
    this.rollArray.push(rollValue)
    this.process(); 
  }

  process() {
    this.assignScoreOrder(this.rollArray);
    this.frameScore(this.scoreOrder, this.rollArray);
  }

  frameScore(scoreOrder, rollArray) {
    var currentScoreOrderRow = scoreOrder[rollArray.length - 1];
    var calcFrameScore = 0;
    for (var i = 0; i < currentScoreOrderRow.length; i++) {
      calcFrameScore += this.frameSubScore(currentScoreOrderRow[i], rollArray);
    }
    this.totalScore += calcFrameScore;
  }

  frameSubScore(rollIndex, rollArray) {
    if (rollIndex === -1) {
      return 0;
    } else if (this._isStrike(rollIndex, rollArray)) {
      return this._strikeFrameScore(rollIndex, rollArray);
    } else if (this._isSpare(rollIndex, rollArray)) {
      return this._spareFrameScore(rollIndex, rollArray);
    } 
    return this._regularFrameScore(rollIndex, rollArray);
  }

  assignScoreOrder(rollArray) {
    var lastRollIndex = rollArray.length - 1;
    if (this._isStrike(lastRollIndex, rollArray)) {
      this._pushStrikeScore(lastRollIndex);
    } else {
      if (this.isEndOfFrame) {
        if (this._isSpare(lastRollIndex, rollArray)) {
          this._pushSpareScore(lastRollIndex);
          this._switchRolls();
        } else {
          this._pushRegularScore(lastRollIndex);
          this._switchRolls();
        }
      } else {
        this._pushBufferScore(lastRollIndex);
        this._switchRolls();
      }
    } 
  }

  _pushStrikeScore(rollIndex) {
    this._pushScore(rollIndex, -1) 
    this._pushScore(rollIndex + 1, -1) 
    this._pushScore(rollIndex + 2, rollIndex) 
  }

  _pushSpareScore(rollIndex) {
    this._pushScore(rollIndex, -1) 
    this._pushScore(rollIndex + 1, rollIndex) 
  }

  _pushRegularScore(rollIndex) {
    this._pushScore(rollIndex, rollIndex)
  }

  _pushBufferScore(rollIndex) {
    this._pushScore(rollIndex, -1) 
  }

  _pushScore(scoreOrderIndex, rollIndex) {
    if(this.scoreOrder[scoreOrderIndex]) {
      this.scoreOrder[scoreOrderIndex].push(rollIndex);
    } else {
      this.scoreOrder.push([rollIndex]);
    } 
  }

  _switchRolls() {
    this.isEndOfFrame = !this.isEndOfFrame
  }

  _isSpare(rollIndex, rollArray) {
    return this._regularFrameScore(rollIndex, rollArray) === 10;
  }

  _isStrike(rollIndex, rollArray) {
    return rollArray[rollIndex] === 10;
  }

  _regularFrameScore(rollIndex, rollArray) {
    return (rollArray[rollIndex] + rollArray[rollIndex - 1]);
  }

  _spareFrameScore(rollIndex, rollArray) { 
    return this._regularFrameScore(rollIndex, rollArray) + rollArray[rollIndex + 1];
  }

  _strikeFrameScore(rollIndex, rollArray) {
    return (rollArray[rollIndex + 2] + rollArray[rollIndex + 1] + rollArray[rollIndex]);
  }
}
