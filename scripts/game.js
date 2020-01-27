var game;

let atesHak=tankNesnesi.sarjor;
let uzayliSayaci=0;


class playGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }

    preload() {
        this.load.spritesheet('uzayli', 
            'assets/uzayli.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('patlama', 
            'assets/patlama.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.image("tank", "assets/tank.png");
        this.load.image("mermi", "assets/mermi.png");

    }

    create() {
        
            
        this.uzayliGrup = this.physics.add.group();
        for (let i = 0; i < sahneNesnesi.uzayliSayisi; i++) {
            this.uzayliGrup.create(Phaser.Math.Between(30,game.config.width-30), -i*40, 'uzayli');
        }
        console.log(this.uzayliGrup.getLength());
        
        
        uzayliAnimasyonuOlustur(this.anims,'uzayli','uzayli',0,7,15);
        patlamaEfektiOlustur(this.anims,'patlama','patlama',0,12,50);

        this.tank = this.physics.add.sprite(200,game.config.height-25, "tank");
        this.tank.setCollideWorldBounds(true);
        this.input.on("pointerdown", this.tankHareketEt, this);
        this.input.on("pointerup", this.tankDur, this);
        this.mermi = this.physics.add.sprite(-100,-100, "mermi");
        
        
        this.uzayliText=this.add.text(23, 5, uzayliSayaci, { fontFamily: '"Press Start 2P",cursive',fontSize:'12px' });
        this.uzayliText.text=uzayliSayaci;
        this.uzayliResim=this.physics.add.sprite(10,12, "uzayli");
        this.uzayliResim.setScale(.5);

        this.mermiResim = this.physics.add.sprite(10,30, "mermi");
        this.mermiText=this.add.text(23, 25, tankNesnesi.sarjor, { fontFamily: '"Press Start 2P",cursive',fontSize:'12px' });
        this.mermiText.text=atesHak;

        this.uzayliGrup.getChildren().forEach(function(uzayli){
            uzayli.setVelocityY(uzayliNesnesi.uzayliHiz);
            uzayli.anims.play('uzayli', true);
        });
         

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

    
    
    update() {
        let tank=this.tank;
        let sahne=this.scene;
        let uzayliText=this.uzayliText;
        let mermiText=this.mermiText;
         
        this.uzayliGrup.getChildren().forEach(function(uzayli){
            //aşağıya varış kontrol
            
            if(uzayli.getBounds().bottom>tank.getBounds().top){
                uzayliSayaci=0;
                uzayliText.text=uzayliSayaci;
                atesHak=tankNesnesi.sarjor;
                mermiText.text=atesHak;
                sahne.start('PlayGame');
                
            }
            
            
        });

        this.physics.add.overlap(this.mermi, this.uzayliGrup,this.uzayliYokEt,null,this);

        

    }


    uzayliYokEt(mermi,uzayli){
        this.patlama = this.physics.add.sprite(uzayli.x,uzayli.y, "patlama");
        uzayli.disableBody(true, true);
        this.uzayliGrup.remove(uzayli);
        
        this.patlama.anims.play('patlama', true);
        
        //console.log(this.uzayliGrup.getLength());
        mermi.disableBody(true, true);
        uzayliSayaci++;
        this.uzayliText.text=uzayliSayaci;
    }

    
    
}

