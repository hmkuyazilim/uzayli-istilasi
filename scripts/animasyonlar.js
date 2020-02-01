function uzayliAnimasyonuOlustur(animasyon,key,sprite,start,end,frameRate){
    animasyon.create({
        key: key,
        frames: animasyon.generateFrameNumbers(sprite, { start: start, end: end }),
        frameRate: frameRate,
        repeat: -1
    });
}

function patlamaEfektiOlustur(animasyon,key,sprite,start,end,frameRate){
    animasyon.create({
        key: key,
        frames: animasyon.generateFrameNumbers(sprite, { start: start, end: end }),
        frameRate: frameRate,
        repeat: 0
    });
}

function loadingAnimasyonuOlustur(animasyon,key,sprite,start,end,frameRate){
    animasyon.create({
        key: key,
        frames: animasyon.generateFrameNumbers(sprite, { start: start, end: end }),
        frameRate: frameRate,
        repeat: 0
    });
}

