requirejs.config({
    //By default load any module IDs from js
    baseUrl: 'js',
    paths: {
        knockout: 'ext/knockout-3.4.0',
        jquery: 'ext/jquery-1.11.3'
    }
});

define('main', [
    'knockout',
    'Tasks/MenuHandler', 
    'Utils/Routing',
    'Utils/EventManager',
    'Manager/DialogManager'
], function(ko, MenuViewModel, Routing, EventManager, DialogManager) {
    
    /**
     * Handles the main models ( menu, main content )
     */
    var mainViewModel = function() {
        this.isLoading = ko.observable(true);
        this.menuViewModel = new MenuViewModel();
        this.mainTemplateViewModel = ko.observable({});
        this.mainTemplateName = ko.observable('');
        this.mainTemplateName.subscribe(function(value){console.log(value);});
        this.dialogManager = new DialogManager();
        
        EventManager.subscribe('mainTemplateChanged', 'main', function(templateId) {
           this.changeMainContent(templateId);
        }.bind(this));
        
    };
    
    mainViewModel.prototype = {
        
        /**
         * Changes the main content area according to the new template id
         * @param {String} templateId
         */
        changeMainContent: function(templateId) {
            this.isLoading(true);
            var self = this;
            Routing.getModuleByTemplateId(templateId, function(viewModel) {
                self.mainTemplateViewModel(viewModel);
                self.mainTemplateName(templateId);
                self.isLoading(false);
            });
        }
    };
    
    ko.applyBindings(new mainViewModel());
});