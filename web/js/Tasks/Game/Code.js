define('Tasks/Game/Code', ['knockout', 'Utils/Network'], function(ko, Network) {
    
    /**
     * Selects the content of an element.
     * @param {String} element
     */
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
    
    /**
     * Construktor
     * @param {Object} data
     */
    var Code = function(data) {
        this.description = ko.observable(data.description);
        this.code = ko.observable(data.code);
        this.id = data.id;
        this.isEditMode = ko.observable(false);
        this.visible = ko.observable(true);
    };
    
    Code.prototype = {   
        
        /**
         * Selects the load code and try to copy it.
         */
        selectCode: function() {
            SelectText(this.id);
            try {
                document.execCommand('copy');
            } catch (err) {
                console.log('The browser does not support document.execCommand', err);
            }
        },
        
        /**
         * Enables the edit mode
         */
        edit: function() {
            this.isEditMode(true);
        },
        
        /**
         * Saves the changes made.
         */
        save: function() {
            var uri = 'code/' + this.id;
            var data = {
                description: this.description(),
                code: this.code()
            };
            
            var self = this;
            Network.postRequest(uri, data, function() {
                self.isEditMode(false);
                if(data.description.length === 0) {
                    self.visible(false);
                }
            });
        }
    };
    
    return Code;
});