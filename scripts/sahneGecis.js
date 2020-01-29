var game;
var tween;
var tweenKontrol=0;

class sahneGecisGame extends Phaser.Scene {
    constructor() {
        super('SahneGecisGame');
    }

    preload() {
        
        this.load.image("tank", "assets/tank.png");
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

        const resTank=db.collection('tanklar').doc('tank1');
        resTank.get().then((veri)=>{
                let v=veri.data();
                tankNesnesi.tankBilgileriniGuncelle(v.tankHiz,v.mermiHiz,v.sarjor,v.mermiBekleme);
        });

        

        

        

        this.sahneText=this.add.text(game.config.width / 4, game.config.height/ 2, 'Sahne '+this.sahneBilgisi, { fontFamily: '"Press Start 2P",cursive',fontSize:'20px' });
        this.sahneText.text='SAHNE '+this.sahneBilgisi;
        this.tank = this.physics.add.sprite(game.config.width / 2,game.config.height+100, "tank");
        

        

        this.tweenOlustur();
        
    }

    update(totalTime, deltaTime) {
        let sahne=this.scene;
        if (tweenKontrol==1)
        {
            tweenKontrol=0;
            sahne.start('Play1Game');

    
        }
    }
    tweenOlustur(){
        tween=this.tweens.add({
            targets: this.tank,
            x:game.config.width/ 2,
            y:game.config.height-25,
            ease: 'Linear',
            duration: 2000,
            yoyo: false,
            repeat:0,
            onComplete:function(){
                tweenKontrol=1;
                
            }
        });
    }

    
}

