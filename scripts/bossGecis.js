var game;
var tween;
var tweenKontrol=0;

class bossGecisGame extends Phaser.Scene {
    constructor() {
        super('BossGecisGame');
    }

    preload() {
        
        
        this.load.image("tank", "assets/tank.png");
        this.load.image("boss", "assets/"+sahneNesnesi.bossTip+".png");
    }

    create() {

        if(localStorage.getItem('sahne')){
            this.sahneBilgisi=localStorage.getItem('sahne');
        }
        else{
            this.sahneBilgisi="1";
        }

        const resSahne=db.collection('sahneler').doc('sahne'+this.sahneBilgisi);
        resSahne.get().then((veri)=>{
                let s=veri.data();
                sahneNesnesi.sahneBilgileriniGuncelle(s.uzayliSayisi,s.bossTip,s.uzayliTip);

                const resBoss=db.collection('bosslar').doc(s.bossTip);
                resBoss.get().then((veri)=>{
                let b=veri.data();
                bossNesnesi.bossBilgileriniGuncelle(b.atesAraligi,b.bossHiz,b.guc,b.mermiHiz,b.mermiTip);
            });
        });

        

        
        

        
        this.tank = this.physics.add.sprite(game.config.width / 2,game.config.height-25, "tank");
        this.boss = this.physics.add.sprite(game.config.width / 2,-200, "boss");
        

        this.tank.setCollideWorldBounds(true);

        

        this.tweenOlustur();
        
    }

    update(totalTime, deltaTime) {
        let sahne=this.scene;
        if (tweenKontrol==1)
        {
            tweenKontrol=0;
            sahne.start('Boss1Game');
    
        }
    }
    tweenOlustur(){
        tween=this.tweens.add({
            targets: this.boss,
            x:game.config.width/ 2,
            y:50,
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

