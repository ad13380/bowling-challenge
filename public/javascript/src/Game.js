class Game {
  constructor(score = new Score()) {
    this.score = score;
    this.frameNumber = 0;
    this.rollNumber = 1;
    this.bonusRoundNumber = 0;
    this.previousScore = null;
  }

  update(rollValue) {
    this._updateScore(rollValue)
    this._updateRollFrame(rollValue) 
  }
  
  displayScore() {
    if (this._isValidScore(this.score.total())) {
      this.previousScore = this.score.total();
      return this.score.total(); 
    }
    return null; 
  }

  displayFrame(rollValue) {
    if ((this.score.isEndOfFrame | rollValue == 10) && this.frameNumber <= 10) {
      return this.frameNumber;
    }
    return null;
  }

  isEnd() {
    if (this.frameNumber >= 10) {
      if (this.bonusRoundNumber == 2) {
        return true;
      }
      this.bonusRoundNumber++;
    }
    return false;
  }

  _updateRollFrame(rollValue) { 
    if (this.score.isEndOfFrame | rollValue == 10) { 
      this._updateFrameNumber();
      this.rollNumber = 1;
    } else {
      this.rollNumber = 2;
    }
  }

  _updateFrameNumber() {
    this.frameNumber++;
  }

  _updateScore(rollValue) {
    this.score.addRoll(rollValue);
  }

  _isValidScore(newScore) {
    return newScore != this.previousScore && newScore != 0;
  }
}
