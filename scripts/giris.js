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
        scene: [homeGame,playGame]
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
        const resTank=db.collection('tanklar').doc('tank1');
        resTank.get().then((veri)=>{
                let v=veri.data();
                tankNesnesi.tankBilgileriniGuncelle(v.tankHiz,v.mermiHiz,v.sarjor,v.mermiBekleme);
        });

        const resUzayli=db.collection('uzaylilar').doc('uzayli1');
        resUzayli.get().then((veri)=>{
                let u=veri.data();
                uzayliNesnesi.uzayliBilgileriniGuncelle(u.uzayliHiz);
        });

        const resSahne=db.collection('sahneler').doc('sahne1');
        resSahne.get().then((veri)=>{
                let s=veri.data();
                sahneNesnesi.sahneBilgileriniGuncelle(s.uzayliSayisi);
        });


        this.baslat = this.physics.add.sprite(game.config.width/2,game.config.height/2, "baslat");
        
        this.baslat.setInteractive().on('pointerdown', function() {
            this.scene.scene.start('PlayGame');
        });
        
    }


    update(){

    }

}