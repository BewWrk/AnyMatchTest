import { GameScene } from "./GameScene.js";
import MainScene from "./MainScene.js";
import GrayScalePipeline from './pipeline/GrayscalePipeline.js';

const config = {
    width:1656,
    height:3036,
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
    pipeline: { 'Gray': GrayScalePipeline },
    dom: {
      createContainer: true
    }
  }

  new Phaser.Game(config);