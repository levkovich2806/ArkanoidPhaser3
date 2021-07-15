import Phaser from 'phaser';
import Ball from './ball'

class MyGame extends Phaser.Scene {
  ball: Ball

  // constructor() {
  //
  //   // this.ball = new Ball(this)
  // }

  get sceneCenterX() {
    return this.cameras.main.centerX
  }

  get sceneCenterY() {
    return this.cameras.main.centerY
  }

  get sceneWidth() {
    return this.cameras.main.width
  }

  get sceneHeight() {
    return this.cameras.main.height
  }


  preload() {
    this.load.image('ball', require('./assets/img/ball.png'));
    console.log(this)
  }

  create() {
    this.ball = this.add.sprite(this.sceneCenterX, this.sceneHeight - 25, 'ball');
  }

}

const config = {
  type: Phaser.AUTO,
  parent: 'arkanoid',
  width: 800,
  height: 600,
  scene: MyGame,
  backgroundColor: "#e2e6ec"
};

const game = new Phaser.Game(config);
