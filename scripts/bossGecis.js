var game;
var tween;
var tweenKontrol=0;

class bossGecisGame extends Phaser.Scene {
    constructor() {
        super('BossGecisGame');
    }

    preload() {
        
        
        this.load.image("tank", "assets/tank.png");
        this.load.image("boss", "assets/boss.png");
    }

    create() {

        const resBoss=db.collection('bosslar').doc('boss1');
        resBoss.get().then((veri)=>{
                let b=veri.data();
                bossNesnesi.bossBilgileriniGuncelle(b.atesAraligi,b.bossHiz,b.guc,b.mermiHiz);
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

