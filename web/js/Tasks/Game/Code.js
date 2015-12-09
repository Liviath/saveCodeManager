define('Tasks/Game/Code', ['knockout'], function(ko) {
    function SelectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    var Code = function(data) {
        this.description = data.description;
        this.code = data.code;
        this.id = data.id;
    };
    
    Code.prototype = {        
        selectCode: function() {
            SelectText(this.id);
            try {
                document.execCommand('copy');
            } catch (err) {
                console.log('The browser does not support document.execCommand');
            }
        }
    };
    
    return Code;
});