export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        
        console.log("preload");
        this.load.image("background", "assets/images/Bg.png");
        this.load.image("buttonStart", "assets/images/ButtonSquareGreen.png");
        this.load.image("buttonStart4X", "assets/images/ButtonPrim.png");
        this.load.image("buttonNewGame", "assets/images/ButtonSec.png");
        this.load.audio('lobbyBgm', 'assets/sound/game-bgm.mp3');
        this.load.audio('lobbyBgm2', 'assets/sound/lobby-bgm.mp3');
        this.load.audio('lobbyBgm3', 'assets/sound/073534923.mp3');
        this.load.audio('lobbyBgm4', 'assets/sound/123983801.mp3');
    }

    create() {
        console.log("create");
        this.add.text(20,20, "Loading...");
        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        //let lobbySound = this.sound.add('lobbyBgm', {volume: 0.3});
        //lobbySound.loop = true;
        //lobbySound.play();

        var spriteStart4x = this.add.sprite(67,347, 'buttonStart4X').setOrigin(0,0).setInteractive().setScale(0.25);
        var spriteStart = this.add.sprite(67,447, 'buttonStart').setOrigin(0,0).setInteractive();
        var spriteNewGame = this.add.sprite(67,547, 'buttonNewGame').setOrigin(0,0).setInteractive().setScale(0.5);

        spriteStart.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
        });

        spriteStart.on('pointerout', function (pointer) {
            this.clearTint();
        }, this);

        spriteStart.on('pointerup', function (pointer) {
            //lobbySound.stop();
            this.clearTint();
            this.scene.scene.start('GameScene');
        });
    }

    update() {
        console.log("update");
    }
}