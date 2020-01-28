var game;
let bossSayaci=100;
var tween;
var tweenKontrol=0;

class boss1Game extends Phaser.Scene {
    constructor() {
        super('Boss1Game');
    }

    preload() {
        
        this.load.spritesheet('patlama', 
            'assets/patlama.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.image("tank", "assets/tank.png");
        this.load.image("mermi", "assets/mermi.png");
        this.load.image("boss", "assets/boss1.png");
        this.load.image("bossMermi", "assets/boss_mermi.png");
    }

    create() {
        bossSayaci=100;
        atesHak=tankNesnesi.sarjor;
        
        patlamaEfektiOlustur(this.anims,'patlama','patlama',0,12,50);

        this.tank = this.physics.add.sprite(game.config.width / 2,game.config.height-25, "tank");
        this.boss = this.physics.add.sprite(game.config.width/ 2,50, "boss");
        this.atesZaman=0;

        this.tank.setCollideWorldBounds(true);
        this.boss.setCollideWorldBounds(true);

        this.input.on("pointerdown", this.tankHareketEt, this);
        this.input.on("pointerup", this.tankDur, this);
        this.mermi = this.physics.add.sprite(-100,-100, "mermi");
        
        
        this.bossText=this.add.text(23, 5, bossSayaci, { fontFamily: '"Press Start 2P",cursive',fontSize:'12px' });

        this.bossText.text=bossSayaci;
        this.bossResim=this.physics.add.sprite(10,12, "boss");
        this.bossResim.setScale(.2);

        this.mermiResim = this.physics.add.sprite(10,30, "mermi");
        this.mermiText=this.add.text(23, 25, tankNesnesi.sarjor, { fontFamily: '"Press Start 2P",cursive',fontSize:'12px' });
        this.mermiText.text=atesHak;

        this.tweenOlustur();
        
    }

    tankHareketEt(p){
        let hizYonu;
        if(p.x<game.config.width / 5){
            hizYonu=-1;
        }else if(p.x>(game.config.width / 5)*4){
            hizYonu=1;
        }else{
            hizYonu=0;
            if(atesHak!=0){
                this.atesEt();
            }
             
        }
        this.tank.body.velocity.x = tankNesnesi.tankHiz * hizYonu;
    }

    tankDur(){
        this.tank.body.velocity.x = 0;
    }

    atesEt(){
        this.mermi = this.physics.add.sprite(this.tank.x,this.tank.y, "mermi");
        this.mermi.setVelocityY(-tankNesnesi.mermiHiz);
        atesHak--;
        this.mermiText.text=atesHak;
        if(atesHak==0){
            setTimeout(()=>{
                atesHak=tankNesnesi.sarjor;
                this.mermiText.text=atesHak;
            },tankNesnesi.mermiBekleme);
        }
    }

    
    
    update(totalTime, deltaTime) {
        if(totalTime>this.atesZaman){
           this.atesZaman=totalTime+5000;
           this.bossMermi = this.physics.add.sprite(this.boss.x,this.boss.getBounds().bottom, "bossMermi");
           this.bossMermi.setVelocityY(100);

        }
       
        
        
        let tank=this.tank;
        let sahne=this.scene;
        let bossText=this.bossText;
        let mermiText=this.mermiText;
         
        this.physics.add.overlap(this.mermi, this.boss,this.bossVur,null,this);
        this.physics.add.overlap(this.bossMermi, this.tank,this.tankVur,null,this);
        if (tweenKontrol==1)
        {
            tweenKontrol=0;
            this.tweenOlustur();
    
        }
    }

    bossVur(mermi,boss){
        this.patlama = this.physics.add.sprite(mermi.x,mermi.y, "patlama");
        
        this.patlama.anims.play('patlama', true);
        
        //console.log(this.uzayliGrup.getLength());
        mermi.disableBody(true, true);
        bossSayaci--;
        this.bossText.text=bossSayaci;
    }

    tankVur(mermi,tank){
        let sahne=this.scene;
        this.patlama = this.physics.add.sprite(tank.x,tank.y, "patlama");
        
        this.patlama.anims.play('patlama', true);
        
        //console.log(this.uzayliGrup.getLength());
        mermi.disableBody(true, true);
        tank.disableBody(true, true);
        setTimeout(()=>{
            sahne.start('HomeGame');
        },500)
        
    }
    tweenOlustur(){
        tween=this.tweens.add({
            targets: this.boss,
            x:Phaser.Math.Between(0,game.config.width),
            y:Phaser.Math.Between(0,game.config.height/4),
            ease: 'Linear',
            duration: 3000,
            yoyo: true,
            repeat:0,
            onComplete:function(){
                tweenKontrol=1;
                
            }
        });
    }

    
}

