var game;
var index=0;


class tankMagazaGame extends Phaser.Scene {
    constructor() {
        super('TankMagazaGame');
    }


    preload() {

        this.load.image("tank1", "assets/tank1.png");
        this.load.image("tank2", "assets/tank2.png");
        this.load.image("tank3", "assets/tank3.png");
        this.load.image("tank4", "assets/tank4.png");

        this.load.image("sol", "assets/sol_ok.png");
        this.load.image("sag", "assets/sag_ok.png");

        this.load.image("tik", "assets/tik.png");
        this.load.image("geri", "assets/geri.png");

    }



    create(){
        this.tank = this.physics.add.sprite(game.config.width/2,game.config.height+100,"tank1");
        this.tik = this.physics.add.sprite(game.config.width/2,game.config.height+100,"tik");


        this.mermiBekleme=this.add.text(game.config.width / 6, game.config.height/ 10, 'Mermi Bekleme: ', { fontFamily: '"Press Start 2P",cursive',fontSize:'10px' });

        this.mermiHiz=this.add.text(game.config.width / 6, game.config.height/ 7.5, 'Mermi Hız: ', { fontFamily: '"Press Start 2P",cursive',fontSize:'10px' });

        this.sarjor=this.add.text(game.config.width / 6, game.config.height/ 6, 'Şarjör: ', { fontFamily: '"Press Start 2P",cursive',fontSize:'10px' });

        this.tankHiz=this.add.text(game.config.width / 6, game.config.height/ 5, 'Tank Hız: ', { fontFamily: '"Press Start 2P",cursive',fontSize:'10px' });

        this.fiyat=this.add.text(game.config.width / 15, game.config.height/ 5*3.5, 'Tank Fiyatı: ', { fontFamily: '"Press Start 2P",cursive',fontSize:'12px' });
        


        this.tankGetir(index);
        
        this.sol_ok = this.physics.add.sprite(20,game.config.height/2, "sol");

        this.sol_ok.setInteractive().on('pointerdown', function() {

            if(index!=0){
                index--;
                this.scene.tankGetir(index);
            }

        });

        this.sag_ok = this.physics.add.sprite(game.config.width-20,game.config.height/2, "sag");

        this.sag_ok.setInteractive().on('pointerdown', function() {

            if(index!=3){
                index++;
                this.scene.tankGetir(index);

            }

        });

        this.geri = this.physics.add.sprite(game.config.width-40,game.config.height-40, "geri");

        this.geri.setInteractive().on('pointerdown', function() {

            location.reload();

        });




    }

    tankGetir(index){

        this.tank.destroy();
        this.tik.destroy();

        db.collection('tanklar').get().then((snap)=>{

            

            this.tank = this.physics.add.sprite(game.config.width/2,game.config.height/2, snap.docs[index].id);

            
            this.mermiBekleme.text='Mermi Bekleme: '+snap.docs[index].data().mermiBekleme;
            this.mermiHiz.text='Mermi Hız: '+snap.docs[index].data().mermiHiz;
            this.sarjor.text='Şarjör: '+snap.docs[index].data().sarjor;
            this.tankHiz.text='Tank Hiz: '+snap.docs[index].data().tankHiz;
            this.fiyat.text='Tank Fiyat: '+snap.docs[index].data().fiyat;

            //eğer para tank parasından büyükse
            db.collection('oyuncular').doc(auth.currentUser.uid).get().then((veri)=>{

                console.log(veri.data());
                if(veri.data().para>snap.docs[index].data().fiyat){
                    this.tik = this.physics.add.sprite(game.config.width/2,game.config.height/5*4, "tik");

                    this.tik.setInteractive().on('pointerdown', function() {

                    let kalanPara=veri.data().para-snap.docs[index].data().fiyat;
                    
                    db.collection('oyuncular').doc(auth.currentUser.uid).update({
                        para:kalanPara,
                        tankTip:snap.docs[index].id
                    }).then(()=>{
                        location.reload();
                    }) 
                    });
                }
                
            })
            

        })

    }



    update(){
        //this.tankGetir(index);
    }


}



