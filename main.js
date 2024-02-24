let nIntervSlideShow;
conM = $(".imgContainer");
conL = $(".imgLeftContainer");
conR = $(".imgRightContainer");
slideTime = 5000;


$(document).ready(function() {
    console.log("JS Loaded");

    AnimateBus();
    HideLift();
    
    
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

    $("#liftButton").on("click", function(){
        ViewLift()
    });
    $("#liftCloseButton").on("click", function(){
        HideLift();
    });
    
    
    

    SlidePause(conL);
    SlidePause(conM);
    SlidePause(conR);
    
    SlidePause($(".ArrowButton"));
    
});

imgCont = $("#LiftImageContainer")
imgClose = $("#liftCloseButton")
function ViewLift(){
   
    PopIn(imgCont)
    PopIn(imgClose)

    imgClose.css({
        cursor: "pointer"
    })
}
function HideLift(){
    imgCont.animate({
        opacity: "0%"
    }, 250)
    imgClose.animate({
        opacity: "0%"
    }, 250)
    imgClose.css({
        cursor: "default"
    })
}


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
var busCounter = 0;
bus = $(".Bus");
logo = $(".LogoAnimated");
screenW = $(window).width();
busLineWidth = $("#BusLine").width();

function AnimateBus(){
    bus.css({
        "left": "2px",
        "width": busLineWidth/2+150,
        "opacity": 0
    });
    
    logo.css("left", busLineWidth/2-150)
    logo.css("opacity", 0)
    logo.empty()
    
    if(busCounter==0){
        logo.prepend('<h1>Transport Pojazdów</h1>')
    }
    else if(busCounter==1){
        logo.prepend('<h1>Duże<br>Gabaryty</h1>')
    }
    else if(busCounter==2){
        logo.prepend('<h1 style="position: relative;top:25%">Przeprowadzki</h1>')
    }
    else{
        logo.prepend('<img class="img-fluid" src="images/logo300x110.png"/>')
    }
    
    bus.animate({
        opacity: "100%"
    }, 500, function () { 
        
        logo.animate({
            opacity: "100%"
        }, 2000)
        
        bus.animate({
            left: busLineWidth-150,
            width: "100px"
        }, 2500, function () { 
            
            bus.animate({
                width: "100px",
                opacity: "0%"
            }, 500)
            
            bus.animate({
                left: busLineWidth-200,
            }, 100, function () { 
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
                }) 
            })
        })
    })
}


