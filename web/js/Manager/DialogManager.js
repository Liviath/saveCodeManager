define('Manager/DialogManager', [
    'knockout',
    'Utils/Routing',
    'Utils/EventManager',
    'jquery'
], function(ko, Routing, EventManager, $) {
    
    var DialogManager = function() { 
        this.isOpened = ko.observable(false);;
        this.dialogTemplateId = ko.observable('');
        this.dialogViewModel = ko.observable({});
        this.dialogSize = ko.pureComputed(function() {
            return 'dialog--' + this.dialogSizeCfg();
        }, this);
        this.dialogSizeCfg = ko.observable('small');
        
        EventManager.subscribe('openDialog', 'manager', function(params) {
            var templateId = typeof params === 'object' ? params.templateId : params;
            var options = typeof params === 'object' ? params.options : null;
            this.openDialogByTemplateId(templateId, options);
        }.bind(this));
        
        EventManager.subscribe('closeDialog', 'manager', function() {
            this.closeDialog();
        }.bind(this))
        
        document.getElementById('dialogArea').removeAttribute('style');
    };
    
    DialogManager.prototype = {
        
        /**
         * Opens a dialog by a given template identifier.
         * @param {String} templateId
         * @parma {Object} options
         */
        openDialogByTemplateId: function(templateId, options) {
            var self = this;
            Routing.getModuleByTemplateId(templateId, function(viewModel) {
                if(typeof viewModel.init === 'function') {
                    viewModel.init(options);
                }
                var dialogCfg = Routing.getModuleConfigByTemplateId(templateId);
                self.dialogSizeCfg(dialogCfg.size);
                self.dialogViewModel(viewModel);
                self.dialogTemplateId(templateId);
                self.isOpened(true);
                $(".dialog-overlay").hide(0);
                $(".dialog-overlay").fadeIn(400);
            });
        },
        
        closeDialog: function() {
            $(".dialog-overlay").fadeOut(400);
            var self = this;
            setTimeout(function() {
                self.isOpened(false);
            }, 400);
        }
    };
    
    return DialogManager;
});
