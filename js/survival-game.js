import { GameScene } from "./GameScene.js";
import MainScene from "./MainScene.js";
import GrayScalePipeline from './pipeline/GrayscalePipeline.js';

const config = {
    width:414,
    height:756,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'survival-game',
    scene:[MainScene, GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'matter',
      matter: {
        debug:true,
        gravity:{y:0},
      }
    },
    pipeline: { 'Gray': GrayScalePipeline }
  }

  new Phaser.Game(config);