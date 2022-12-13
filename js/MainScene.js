export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        
        console.log("preload");
        this.load.image("background", "assets/images/Bg.png");
        this.load.image("buttonStart", "assets/images/ButtonPrim.png");
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

        var spriteStart = this.add.sprite(134,787, 'buttonStart').setOrigin(0,0).setInteractive();

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