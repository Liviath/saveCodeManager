define('Tasks/Game/Game', ['knockout', 'Utils/Network', 'Utils/EventManager', 'Tasks/Game/Code'], function(ko, Network, EventManager, Code) {
    
    var Game = function(data) {
        this.name = data.name;
        this.amountOfSaveCodes = data['amount_of_save_codes'];
        this.isSelected = ko.observable(false);
        this.newDescription = ko.observable('');
        this.newCode = ko.observable('');
        this.addCode = ko.observable(false);
        this.gameId = data['id'];
        this.items = ko.observableArray([]);
        this.isLoading = ko.observable(true);
        this.refresh();
    };
    
    Game.prototype = {
        
        /**
         * Selects a game
         */
        select: function() {
            this.isSelected(!this.isSelected());
            if(!this.isSelected()) {
                this.addCode(false);
            }
        },
        
        /**
         * Shows or hides the add code field
         */
        toggleAddCode: function() {
            this.addCode(!this.addCode());
            this.isSelected(true);
        },
        
        /**
         * Saves a new code
         */
        saveCode: function() {
            var data = {
                description: this.newDescription(),
                code: this.newCode(),
                gameId: this.gameId
            };
            var self = this;
            Network.postRequest('code', data, function(data, code) {
                if(code === 204) {
                    self.addCode(false);
                    self.refresh();
                }
            });
        },
        
        /**
         * Refreshes the items in the game.
         */
        refresh: function() {
            var data = {
                gameId: this.gameId
            };
            var self = this;
            Network.getRequest('code/all', data, function(data) {
                var items = [];
                for(var item in data) {
                    if(data.hasOwnProperty(item)) {
                        items.push(new Code(data[item]));
                    }
                }
                self.items(items);
                self.isLoading(false);
            });
        },
        
        removeGame: function() {
            EventManager.trigger('openDialog', {templateId: 'dialog-remove-game-template', options: this.gameId});
        }
    };
    
    return Game;
});