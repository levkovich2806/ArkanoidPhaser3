import Phaser, {Types} from 'phaser';

const BALL = 'ball'
const PADDLE = 'paddle'

const BALL_VELOCITY = 350
const PADDLE_VELOCITY = 400

class MyGame extends Phaser.Scene {
  // ball: Ball
  ball: Phaser.Physics.Arcade.Sprite
  paddle: Phaser.Physics.Arcade.Sprite
  playing: boolean = false
  startButton: Phaser.GameObjects.Text
  cursor: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('game-scene')
    this.ball = undefined
    this.paddle = undefined
  }

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
    this.load.image(BALL, require('./assets/img/ball.png'));
    this.load.image(PADDLE, require('./assets/img/paddle.png'));
  }

  create() {
    this.ball = this.createBall()
    this.paddle = this.createPaddle()

    this.physics.add.collider(this.ball, this.paddle)

    this.physics.world.on('worldbounds', this.onWorldBounds)

    this.cursor = this.input.keyboard.createCursorKeys()

    this.startButton = this.add.text(this.sceneCenterX, this.sceneCenterY, 'Start')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({backgroundColor: '#111'})
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => this.startGame())
      .on('pointerover', function () {
        this.setStyle({fill: '#f39c12'})
      })
      .on('pointerout', function () {
        this.setStyle({fill: '#FFF'})
      })
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    this.listenUserKeyboard()
  }

  listenUserKeyboard() {
    if (!this.playing) {
      return
    }

    if (this.cursor.left.isDown) {
      this.paddle.setVelocityX(-PADDLE_VELOCITY)
    } else if (this.cursor.right.isDown) {
      this.paddle.setVelocityX(PADDLE_VELOCITY)
    } else {
      this.paddle.setVelocity(0)
    }
  }

  onWorldBounds(body: any, up: any, down: any, left: any, right: any) {
    const objectKey = body.gameObject.texture.key
    console.log({
      body, up, down, left, right, gameObject: body.gameObject
    })

    if (objectKey === BALL) {
      if (down) {
        console.log("GAME OVER")
      }
    }
  }

  createBall() {
    const ball = this.physics.add.sprite(this.sceneCenterX, this.sceneHeight - 25, BALL);
    ball.body.setCollideWorldBounds(true, undefined, undefined, true)
    ball.setBounce(1)

    return ball
  }

  createPaddle() {
    const paddle = this.physics.add.sprite(this.sceneCenterX, this.sceneHeight, PADDLE).setOrigin(0.5, 1)
    paddle.setCollideWorldBounds(true)
    paddle.setBounce(1)
    paddle.setImmovable(true)
    return paddle
  }

  startGame() {
    this.startButton.destroy()
    this.ball.setVelocity(BALL_VELOCITY, -BALL_VELOCITY);
    this.playing = true
  }

}

const config: Types.Core.GameConfig = {
  title: 'Arkanoid',
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  width: 800,
  height: 600,
  scene: MyGame,
  backgroundColor: "#e2e6ec",
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
};

const game = new Phaser.Game(config);
