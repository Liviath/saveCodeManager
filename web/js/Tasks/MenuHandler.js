define('Tasks/MenuHandler', ['knockout', 'Utils/Security', 'Utils/EventManager'], function(ko, Security, EventManager) {
    
    /**
     * Menu entry
     * @param {type} content
     * @returns {MenuHandler_L1.menuEntry}
     */
    var menuEntry = function(content, templateId) {
        this.content = content;
        this.isSelected = ko.observable(false);
        this.templateId = templateId;
        
        /**
         * Triggers the event, that the selected entry has been changed.
         */
        this.selectEntry = function() {
            EventManager.trigger('mainTemplateChanged', this.templateId);
        };
    };
    
    // Initializes the menu entries.    
    if(!Security.isLoggedIn()) {
        var menuEntries = [
            new menuEntry('Login', 'login-template'),
            new menuEntry('Register', 'register-template')
        ];
    } else {
        var menuEntries = [
            new menuEntry('Home')
        ];
    }
    
    menuEntries[0].isSelected(true);
    EventManager.trigger('mainTemplateChanged', menuEntries[0].content);
    
    var menuViewModel = function() {
        this.menuEntries = menuEntries;
        
        EventManager.subscribe('mainTemplateChanged', 'menu', function(selectedEntry) {
           for(var entry in this.menuEntries) {
               if(this.menuEntries.hasOwnProperty(entry)) {
                   var isSelected = (this.menuEntries[entry].content === selectedEntry);
                   this.menuEntries[entry].isSelected(isSelected);
               }
           }
        }.bind(this));
    };
    
    return menuViewModel;
});