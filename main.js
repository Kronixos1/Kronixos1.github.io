let nIntervSlideShow;
conM = $(".imgContainer");
conL = $(".imgLeftContainer");
conR = $(".imgRightContainer");
slideTime = 5000;


$(document).ready(function() {
    console.log("JS Loaded");

    AnimateBus();

    
    
    PanoramaMain();
    PanoramaLeft();
    PanoramaRight();
    
    $(".rightArrow").on("click", function(){
        NextImg()
    });
    $(".leftArrow").on("click", function(){
        PrevImg()
    });

    $("#rightImgCont").on("click", function(){
        NextImg()
    });
    $("#leftImgCont").on("click", function(){
        PrevImg()
    });

    
    
    

    SlidePause(conL);
    SlidePause(conM);
    SlidePause(conR);
    
    SlidePause($(".ArrowButton"));
    
});

function SlidePause(_object){
    _object.hover(
        function() {
            clearInterval(nIntervSlideShow);
            nIntervSlideShow = null;
        }, function() {
            nIntervSlideShow = setInterval(NextImg, slideTime);
        }
    );
} 

function NextImg(){
    currentImg++;
    if(currentImg == 31){ currentImg = 0}
    PopIn(conM);

    PanoramaMain();
    PanoramaLeft();
    PanoramaRight();
}
function PrevImg(){
    currentImg--;
    if(currentImg == -1){ currentImg = 30}
    PopIn(conM);

    PanoramaMain();
    PanoramaLeft();
    PanoramaRight();
}


function PopIn(_object){
    _object.css({
        opacity: "0%"
    });
    _object.animate({
        opacity: "100%"
    }, 500)
}

currentImg = 5;
function PanoramaMain(){
    console.log(currentImg)
    
    conM.empty();
    conM.prepend('<img id="gen'+(currentImg)+'"class="generatedImg" src="/images/fcb/i'+(currentImg)+'.jpg" class="img-fluid"/>');
}
function PanoramaLeft(){
    
    conL.empty();
    currentLeftImg = currentImg - 1;
    if(currentLeftImg == -1){currentLeftImg=30}
    conL.prepend('<img id="gen'+(currentLeftImg)+'"class="generatedImgLeft" src="/images/fcb/i'+(currentLeftImg)+'.jpg" class="img-fluid"/>');
}
function PanoramaRight(){
    
    conR.empty();
    currentRightImg = currentImg + 1;
    if(currentRightImg == 31){currentRightImg=0}
    conR.prepend('<img id="gen'+(currentRightImg)+'"class="generatedImRight" src="/images/fcb/i'+(currentRightImg)+'.jpg" class="img-fluid"/>');
}



//<img class="img-fluid" src="images/logo200x100.jpg"/>
let busCounter = 0;
bus = $(".Bus");
logo = $(".LogoAnimated");
SWidth = $(window).width();
function AnimateBus(){
    bus.css({
        "left": "100px",
        "width": SWidth/2,
        "opacity": 0
    });
   
    logo.css("opacity", 0)
    logo.empty()
    
    if(busCounter==0){
        logo.prepend('<span>Transport Pojazdów</span>')
    }
    else if(busCounter==1){
        logo.prepend('Duże Gabaryty')
    }
    else if(busCounter==2){
        logo.prepend('Przeprowadzka')
    }
    else{
        logo.prepend('<img class="img-fluid" src="images/logo200x100.jpg"/>')
    }

    bus.animate({
        opacity: "100%"
    }, 500, function () { // End of cycle1 fadein
        logo.animate({
            opacity: "100%"
        }, 2000)
        bus.animate({
            left: SWidth/2 + 100,
            width: "100px"
        }, 2500, function () { //end of cycle2 go to mid and stop
            bus.animate({
                left: SWidth-200,
                width: "100px"
            }, 2500, function () { //end of cycle3 start from mid and go to end
                if(busCounter != 3){
                    logo.animate({
                        opacity: "0%"
                    }, 500)
                }
                bus.animate({
                    opacity: "0%"
                }, 500, function(){
                    if(busCounter != 3){
                        busCounter++;
                        AnimateBus();
                    }else{
                        if (!nIntervSlideShow) {
                            nIntervSlideShow = setInterval(NextImg, slideTime);
                        }
                    }
                }) //end of cycle4 fadeout
            })
        })
    })
}