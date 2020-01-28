var game;
window.onload = function () {
    
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0xf8c291,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 250,
            height: 450,
            parent: 'thegame'
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            }
        },
        scene: [homeGame,sahneGecisGame,play1Game,bossGecisGame,boss1Game]
    }
   
    game = new Phaser.Game(gameConfig);
    window.focus();
    
}

class homeGame extends Phaser.Scene {
    constructor() {
        super('HomeGame');
    }

    
    preload() {
        
        this.load.image("baslat", "assets/baslat.png");
    }

    create() {
        


        this.baslat = this.physics.add.sprite(game.config.width/2,game.config.height/2, "baslat");
        
        this.baslat.setInteractive().on('pointerdown', function() {
            this.scene.scene.start('SahneGecisGame');
        });
        
    }


    update(){

    }

}