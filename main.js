
var nCols = 85;
var nRows = 10;

var calculateContentHeight = function( ta, scanAmount ) {
    var origHeight = ta.style.height,
        height = ta.offsetHeight,
        scrollHeight = ta.scrollHeight,
        overflow = ta.style.overflow;
    if ( height >= scrollHeight ) {
        ta.style.height = (height + scanAmount) + 'px';
        ta.style.overflow = 'hidden';
        if ( scrollHeight < ta.scrollHeight ) {
            while (ta.offsetHeight >= ta.scrollHeight) {
                ta.style.height = (height -= scanAmount)+'px';
            }
            while (ta.offsetHeight < ta.scrollHeight) {
                ta.style.height = (height++)+'px';
            }
            ta.style.height = origHeight;
            ta.style.overflow = overflow;
            return height;
        }
    } else {
        return scrollHeight;
    }
}

function isSpecialKeyCode(event) {
    // 13: enter, back: 8, >: 39, <: 37, down: 40, up: 38
    if (event.keyCode == 8 || event.keyCode == 39 || event.keyCode == 37 || event.keyCode == 40 || event.keyCode == 38) {
        return true;
    }
    return false;
}

var calculateHeight = function(ta, event) {
    
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle;
        
        taLineHeight = parseInt(style.lineHeight, 10);
        taHeight = calculateContentHeight(ta, taLineHeight);
        numberOfLines = Math.round(taHeight / taLineHeight);
        if(numberOfLines > nRows && !isSpecialKeyCode(event)) {
            let arrayStr = ($(ta)).val().split('\n');
            let length = arrayStr.length;
            previousValue = arrayStr.slice(0,length-1).join('\n');
            ($(ta)).val(previousValue);

            let redundantStr = arrayStr[length-1];
            let mainItem = ($(ta)).closest('.main');
            if (!mainItem.next().length) {
                $('#container').append($('.main')[0].outerHTML);
            }
            setTimeout(function() {
                let nextTextArea = mainItem.next().find('textarea');
                let nextTextAreaValue = redundantStr + nextTextArea.val();
                nextTextArea.val(nextTextAreaValue).focus();
            }, 0);
        }
};


function onKeyUpTextArea(textarea, event) {
    console.log(event.keyCode);
    calculateHeight(textarea, event);
}
