let nIntervSlideShow;
conM = $(".imgContainer");
conL = $(".imgLeftContainer");
conR = $(".imgRightContainer");



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

    
    if (!nIntervSlideShow) {
        nIntervSlideShow = setInterval(NextImg, 4000);
    }
    

    SlidePause(conL);
    SlidePause(conM);
    SlidePause(conR);
});

function SlidePause(_object){
    _object.hover(
        function() {
            clearInterval(nIntervSlideShow);
            nIntervSlideShow = null;
        }, function() {
            nIntervSlideShow = setInterval(NextImg, 4000);
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
    }, 200)
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



function AnimateBus(){
    bus = $(".Bus");
    logo = $(".LogoAnimated");
    SWidth = $(window).width();

    bus.css({
        "left": "100px",
        "width": SWidth/2,
        "opacity": 0
    });
   
    logo.css("opacity", 0)

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
                bus.animate({
                    opacity: "0%"
                }, 500) //end of cycle4 fadeout
            })
        })
    })
}