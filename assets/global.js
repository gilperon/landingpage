/*
    JS ara animar o Mapa e posicionar os elementos
*/
$(window).on("load", function() {

    startAnimation(1000);

    for (let i = 1; i <= 3; i++) {
        updateLabelPosition(i);
        $(window).resize(() => updateLabelPosition(i));
    }
});

function onEndLines(line){

    let lineString = '';
    if(line === 1){
        lineString = 'first';
    }
    if(line === 2){
        lineString = 'second';
    }
    if(line === 3){
        lineString = 'third';
    }

    $('#' + lineString + 'Circle').css('visibility', 'visible');
    $('#' + lineString + 'Label').css('opacity', '1');

    if(line === 1 || line === 2){

        setTimeout(function(){
            $('#' + lineString + 'Circle').css('visibility', 'hidden');
            $('#' + lineString + 'LineSvg').css('visibility', 'hidden');
            $('#' + lineString + 'Label').css('opacity', '0');
            nextAnimation(line);
        }, 3000);

    }else{

        $('#thirdCircle').css('visibility', 'visible');
        $('#thirdLabel').css('opacity', '1');
        startAnimation(3000);
        
    }

}

function nextAnimation(line){
    let nextAnimationString = line === 1 ? 'second' : 'third';
    $('#' + nextAnimationString + 'LineSvg').css('visibility', 'visible');
    $('#' + nextAnimationString + 'Mask').find('animate').eq(0).get(0).beginElement();
}


function restartAnimation(){
    $('#worldMapContainer svg').css('visibility', 'hidden');
    $('#firstLabel, #secondLabel, #thirdLabel').css('opacity', '0');
    $('#firstCircle, #secondCircle, #thirdCircle').css('visibility', 'hidden');
}

function startAnimation(time){
    setTimeout(function(){
        restartAnimation();
        $('#firstLineSvg').css('visibility', 'visible');
        $('#firstMask').find('animate').eq(0).get(0).beginElement();
    }, time);
}

function updateLabelPosition(line){

    let lineString = (line === 1) ? 'first' : (line === 2) ? 'second' : (line === 3) ? 'third' : '';

    let elmCircle = $(`#${lineString}Circle`);
    let elmLabel = $(`#${lineString}Label`);
    let worldMapContainer = $('#worldMapContainer');

    if (elmCircle.length && elmLabel.length && worldMapContainer.length) {

            var circleRect = elmCircle[0].getBoundingClientRect();
            var containerRect = worldMapContainer[0].getBoundingClientRect();

            var relativeLeft = circleRect.left - containerRect.left;
            var relativeTop = circleRect.top - containerRect.top;

            let sizeWindow = $(window).width();

            if(sizeWindow <= 572){
                var LeftAdjustment = 94;
                var topAdjustment = 12;
            }else if(sizeWindow <= 768){
                var LeftAdjustment = 95;
                var topAdjustment = 12;
            }else if(sizeWindow <= 990){
                var LeftAdjustment = 95;
                var topAdjustment = 15;
            }else{
                var LeftAdjustment = 95;
                var topAdjustment = 20;
            }
            
            elmLabel.css('left', relativeLeft - LeftAdjustment + 'px');
            elmLabel.css('top', relativeTop + topAdjustment + 'px');

    }

 }