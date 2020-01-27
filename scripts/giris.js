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


        this.baslamaText=this.add.text(game.config.width/2, game.config.height/2, 'BAŞLA', { fontFamily: '"Press Start 2P",cursive',fontSize:'25px' });
        this.baslamaText.setInteractive().on('pointerdown', function() {
            //Let's start another scene with start
            this.scene.scene.start('PlayGame');
        });
        
    }


    update(){

    }

}