var game;
var tween;
var tweenKontrol=0;

class sahneGecisGame extends Phaser.Scene {
    constructor() {
        super('SahneGecisGame');
    }

    preload() {
        
        this.load.image("tank1", "assets/tank.png");
        this.load.spritesheet('loading', 
            'assets/loading.png',
            { frameWidth: 200, frameHeight: 10 }
        );
    }

    create() {
        //location.reload(); 
        
        if(localStorage.getItem('sahne')){
            this.sahneBilgisi=localStorage.getItem('sahne');
        }
        else{
            this.sahneBilgisi="1";
        }
        console.log('sahne'+this.sahneBilgisi);
        

        const resSahne=db.collection('sahneler').doc('sahne'+this.sahneBilgisi);
        resSahne.get().then((veri)=>{
                let s=veri.data();
                sahneNesnesi.sahneBilgileriniGuncelle(s.uzayliSayisi,s.bossTip,s.uzayliTip);

                const resUzayli=db.collection('uzaylilar').doc(s.uzayliTip);
                resUzayli.get().then((veri)=>{
                let u=veri.data();
                uzayliNesnesi.uzayliBilgileriniGuncelle(u.uzayliHiz);
            });
        });

        

        this.sahneText=this.add.text(game.config.width / 4, game.config.height/ 2, 'Sahne '+this.sahneBilgisi, { fontFamily: '"Press Start 2P",cursive',fontSize:'20px' });
        this.sahneText.text='SAHNE '+this.sahneBilgisi;

        patlamaEfektiOlustur(this.anims,'loading','loading',0,7,10);
        
        this.loading = this.physics.add.sprite(game.config.width / 2,game.config.height/ 2+70, "loading");

        this.loading.anims.play('loading', true);
        
        let sahne=this.scene;
        setTimeout(()=>{
            sahne.start('Play1Game');
        },1000);
    }

    update(totalTime, deltaTime) {
        
            

    }

    
}

