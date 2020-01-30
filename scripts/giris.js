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
        
        dom: {
            createContainer: true
        },
        scene: [homeGame,uyeOlGame,sahneGecisGame,play1Game,bossGecisGame,boss1Game]
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
        this.load.image("profil", "assets/profilResmi.png");
    }

    create() {

        auth.onAuthStateChanged(k=>{
            if(k){

        this.baslat = this.physics.add.sprite(game.config.width/2,game.config.height/2, "baslat");
        
        this.baslat.setInteractive().on('pointerdown', function() {
                const resOyuncu=db.collection('oyuncular').doc(auth.currentUser.uid);
                resOyuncu.get().then((veri)=>{
                    let o=veri.data();
                    oyuncuNesnesi.oyuncuBilgileriniGuncelle(o.para,o.sahne,o.tankTip);

                    localStorage.setItem('sahne',o.sahne);

                    const resTank=db.collection('tanklar').doc(o.tankTip);
                    resTank.get().then((veri)=>{
                    let v=veri.data();
                    tankNesnesi.tankBilgileriniGuncelle(v.tankHiz,v.mermiHiz,v.sarjor,v.mermiBekleme);
                });
            });

            this.scene.scene.start('SahneGecisGame');
        });
        this.girişText=this.add.text(game.config.width / 2, game.config.height/ 2, '', { fontFamily: '"Press Start 2P",cursive',fontSize:'20px' });

       
            }else{
                this.profil = this.physics.add.sprite(game.config.width-30,game.config.height-30, "profil");

                this.profil.setInteractive().on('pointerdown', function() {
                    this.scene.scene.start('UyeOlGame');
                });
            }
                   
        }) 

        
    }


    update(){

    }

}

