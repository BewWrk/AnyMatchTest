var selectedArray = [];
var arry = [];
var rowNum = 0;
var settingButton;
var popup;
var tween = null;

export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("backgroundGame", "assets/images/Bg-game.png");
        this.load.image("menuButton", "assets/images/MenuButton.png");
        this.load.image("toggle", "assets/images/Toggle.png");
        this.load.image("popup", "assets/images/popup.png");
        this.load.image("backButton", "assets/images/BackButton.png");
        this.load.image("closeButton", "assets/images/CloseButton.png");
        this.load.spritesheet('spriteItems', 'assets/images/Items.png', { frameWidth: 44, frameHeight: 44 });
        this.load.audio('buttonSound', 'assets/sound/Click.mp3');
        this.load.audio('matchedSound', 'assets/sound/CorrectMatch.mp3');
        this.load.audio('wrongMatchedSound', 'assets/sound/WrongMatch.mp3');
        this.load.audio('clearRowSound', 'assets/sound/ClearRow.mp3');
        this.load.audio('openSound', 'assets/sound/OpenPopup.mp3');
        this.load.audio('closeSound', 'assets/sound/ClosePopup.mp3');
        //this.load.audio('gameBgm', 'assets/sound/game-bgm.mp3');
    }

    create() {
        this.background = this.add.image(0,0,"backgroundGame");
        this.background.setOrigin(0,0);
        let ButtonSound = this.sound.add('buttonSound', {volume: 0.5});
        ButtonSound.loop = false;
        let MatchedSound = this.sound.add('matchedSound', {volume: 0.7});
        let WrongMatchedSound = this.sound.add('wrongMatchedSound', {volume: 1.0});
        let ClearRowSound = this.sound.add('clearRowSound', {volume: 0.6});
        let OpenSound = this.sound.add('openSound', {volume: 0.3});
        let CloseSound = this.sound.add('closeSound', {volume: 0.3});
        let bgm1Sound = this.sound.add('lobbyBgm', {volume: 0.2});
        let bgm2Sound = this.sound.add('lobbyBgm2', {volume: 0.2});
        let bgm3Sound = this.sound.add('lobbyBgm3', {volume: 0.1});
        let bgm4Sound = this.sound.add('lobbyBgm4', {volume: 0.3});
        bgm1Sound.loop = true;
        bgm2Sound.loop = true;
        bgm3Sound.loop = true;
        bgm4Sound.loop = true;
        bgm1Sound.play();

        var container = this.add.container(9, 130);
        rowNum = 3;
        for (var row = 0; row < rowNum; row++) {
            for (var col = 0; col < 9; col++) {
                var randomNum = Math.floor(Math.random() * 9);
                var sprite = this.add.sprite(9 + (col * 44), 130 + (row * 44), 'spriteItems', randomNum).setOrigin(0,0).setInteractive();
                var Item = new Object();
                Item.sprite = sprite;
                Item.number = randomNum + 1;
                Item.isPlayed = false;
                Item.rowNum = row;
                arry.push(Item);
            }
        }
        console.log(arry);

        arry.forEach(function(e) {
            e.sprite.on('pointerdown', function (pointer) {
                //this.setTint(0xff0000);
                checkItem(e, MatchedSound, WrongMatchedSound, ClearRowSound);
            });
    
            e.sprite.on('pointerout', function (pointer) {
                //this.clearTint();
            });
    
            e.sprite.on('pointerup', function (pointer) {
                ButtonSound.play();
            });
        });

        var spriteBack= this.add.sprite(18,12, 'backButton').setOrigin(0,0).setInteractive();

        spriteBack.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
        });

        spriteBack.on('pointerout', function (pointer) {
            this.clearTint();
        }, this);

        spriteBack.on('pointerup', function (pointer) {
            //gameSound.stop();
            this.clearTint();
            bgm1Sound.stop();
            bgm2Sound.stop();
            bgm3Sound.stop();
            bgm4Sound.stop();
            this.scene.scene.start('MainScene');
        });

        var popupContainer = this.add.container(22, 227);
        var menuSprite= this.add.sprite(22,693, 'menuButton').setOrigin(0,0).setInteractive();
        var closeSprite= this.add.sprite(317,13, 'closeButton').setOrigin(0,0).setInteractive();
        var toggleBgm1 = this.add.sprite(80,120, 'toggle').setOrigin(0,0).setInteractive();
        var toggleBgm2 = this.add.sprite(80,180, 'toggle').setOrigin(0,0).setInteractive();
        var toggleBgm3 = this.add.sprite(200,120, 'toggle').setOrigin(0,0).setInteractive();
        var toggleBgm4 = this.add.sprite(200,180, 'toggle').setOrigin(0,0).setInteractive();
        toggleBgm1.setTint(0xff0000);
        popup = this.add.sprite(0,0, 'popup').setOrigin(0,0);
        popupContainer.add(popup);
        popupContainer.add(closeSprite);
        popupContainer.add(toggleBgm1);
        popupContainer.add(toggleBgm2);
        popupContainer.add(toggleBgm3);
        popupContainer.add(toggleBgm4);
        popupContainer.setScale(0);

        menuSprite.on('pointerdown', function (pointer) {
            OpenSound.play();
            this.setTint(0xff0000);
            popupContainer.setScale(1);
        });
    
        menuSprite.on('pointerout', function (pointer) {
            this.clearTint();
        }, this);
    
        menuSprite.on('pointerup', function (pointer) {
            this.clearTint();
        });

        closeSprite.on('pointerdown', function (pointer) {
            OpenSound.play();
            this.setTint(0xff0000);
            popupContainer.setScale(0);
        });

        toggleBgm1.on('pointerdown', function (pointer) {
            ButtonSound.play();
            bgm1Sound.play();
            bgm2Sound.stop();
            bgm3Sound.stop();
            bgm4Sound.stop();
            this.setTint(0xff0000);
            toggleBgm2.clearTint();
            toggleBgm3.clearTint();
            toggleBgm4.clearTint();
        });

        toggleBgm2.on('pointerdown', function (pointer) {
            ButtonSound.play();
            bgm2Sound.play();
            bgm1Sound.stop();
            bgm3Sound.stop();
            bgm4Sound.stop();
            this.setTint(0xff0000);
            toggleBgm1.clearTint();
            toggleBgm3.clearTint();
            toggleBgm4.clearTint();
        });

        toggleBgm3.on('pointerdown', function (pointer) {
            ButtonSound.play();
            bgm3Sound.play();
            bgm1Sound.stop();
            bgm2Sound.stop();
            bgm4Sound.stop();
            this.setTint(0xff0000);
            toggleBgm1.clearTint();
            toggleBgm2.clearTint();
            toggleBgm4.clearTint();
        });

        toggleBgm4.on('pointerdown', function (pointer) {
            ButtonSound.play();
            bgm4Sound.play();
            bgm1Sound.stop();
            bgm2Sound.stop();
            bgm3Sound.stop();
            this.setTint(0xff0000);
            toggleBgm1.clearTint();
            toggleBgm2.clearTint();
            toggleBgm3.clearTint();
        });
    }

    update() {

    }

}

function addEventButton(sprite, sound) {
    sprite.on('pointerdown', function (pointer) {
        sound.play();
        this.setTint(0xff0000);
    });

    sprite.on('pointerout', function (pointer) {
        this.clearTint();
    }, this);

    sprite.on('pointerup', function (pointer) {
        this.clearTint();
    });
}

function checkItem(item, matchSound, wrongSound, clearRowSound) {
    item.sprite.setTint(0xCDFFCF);
    selectedArray.push(item);
    if(selectedArray.length == 2) {
        //check
        delay(300).then(() => {
            if (selectedArray[0].number == selectedArray[1].number
                || selectedArray[0].number + selectedArray[1].number == 10) {
                matchSound.play();
                selectedArray.forEach((e) => {
                    e.sprite.setTint(0xA7A7A7);
                    e.isPlayed = true;
                });
                for(var row = 0; row < rowNum; row++) {
                    var isRowClear = true;
                    for(var i = 0; i < arry.length; i++) {
                        if (arry[i].rowNum == row) {
                            isRowClear = isRowClear && arry[i].isPlayed;
                        }
                    }
                    console.log("Row " + row + " Not Clear! " + !isRowClear);

                    if (isRowClear) {
                        delay(100).then(() => {
                            clearRowSound.play();
                        });
                        arry.forEach((e) => {
                            if (e.rowNum == row) {
                                e.sprite.destroy(true);
                            }
                        });
                        arry.splice(row * 9, 9);
                        for(var i = row + 1; i < rowNum; i++) {
                            arry.forEach((e) => {
                                if (e.rowNum == i) {
                                    var yPos = e.sprite.y;
                                    e.sprite.setY(yPos - 44);
                                }
                            });
                        }
                    }
                }

            } else {
                wrongSound.play();
                selectedArray.forEach((e) => {e.sprite.clearTint()});
            }
            selectedArray.pop();
            selectedArray.pop();
        });
    }else {

    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



  
