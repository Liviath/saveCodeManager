define('Manager/DialogManager', [
    'knockout',
    'Utils/Routing',
    'Utils/EventManager'
], function(ko, Routing, EventManager) {
    
    var DialogManager = function() { 
        this.isOpened = ko.observable(false);;
        this.dialogTemplateId = ko.observable('');
        this.dialogViewModel = ko.observable({});
        
        EventManager.subscribe('openDialog', 'manager', function(templateId) {
           this.openDialogByTemplateId(templateId);
        }.bind(this));
        
        document.getElementById('dialogArea').removeAttribute('style');
    };
    
    DialogManager.prototype = {
        
        /**
         * Opens a dialog by a given template identifier.
         * @param {String} templateId
         */
        openDialogByTemplateId: function(templateId) {
            var self = this;
            Routing.getModuleByTemplateId(templateId, function(viewModel) {
                self.dialogTemplateId(viewModel);
                self.dialogTemplateId(templateId);
                self.isOpened(true);
            });
        },
        
        closeDialog: function() {
            this.isOpened(false);
        }
    };
    
    return DialogManager;
});
