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
    
    
    var menuViewModel = function() {
        this.isLoading = ko.observable(true);
        this.menuEntries = [];
        
        EventManager.subscribe('mainTemplateChanged', 'menu', function(selectedEntry) {
           for(var entry in this.menuEntries) {
               if(this.menuEntries.hasOwnProperty(entry)) {
                   var isSelected = (this.menuEntries[entry].templateId === selectedEntry);
                   this.menuEntries[entry].isSelected(isSelected);
               }
           }
        }.bind(this));
        this.initMenuEntries();
    };
    
    menuViewModel.prototype = {
        initMenuEntries: function() {
            var self = this;
            Security.isLoggedIn(function(isLoggedIn) {
                if(!isLoggedIn) {
                    self.menuEntries = [
                        new menuEntry('Login', 'login-template'),
                        new menuEntry('Register', 'register-template')
                    ];
                } else {
                    self.menuEntries = [
                        new menuEntry('Home', 'home-template'),
                        new menuEntry('Games', 'game-overview-template'),
                        new menuEntry('Account', 'account-template'),
                        new menuEntry('Logout', 'logout-template')
                    ];
                }
                EventManager.trigger('mainTemplateChanged', self.menuEntries[0].templateId);
                self.isLoading(false);
            });
        }
    }
    
    return menuViewModel;
});