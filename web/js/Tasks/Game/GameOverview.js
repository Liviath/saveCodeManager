define('Tasks/Game/GameOverview', [
    'knockout', 
    'Utils/Network', 
    'Utils/EventManager',
    'Tasks/Game/Game'
], function(ko, Network, EventManager, Game) {
    
    var GameOverview = function() {
        this.isLoading = ko.observable(true);
        
        this.items = ko.observableArray([]);
        this.isEmpty = ko.computed(function() {
            return this.items().length === 0;
        }, this);
        
        EventManager.subscribe('closeDialog', 'gameOverview', function() {
            this.refreshItems();
        }.bind(this));
        this.refreshItems();
    };
    
    GameOverview.prototype = {
        
        /**
         * Opens the dialog to add a game
         */
        openAddGameDialog: function() {
            EventManager.trigger('openDialog', 'dialog-add-game-template');
        },
        
        /**
         * Refreshes the view data.
         */
        refreshItems: function() {
            var self = this;
            Network.getRequest('game/all', {}, function(data) {
                var newItems = [];
                for(var item in data) {
                    if(data.hasOwnProperty(item)) {
                        newItems.push(new Game(data[item]));
                    }
                }
                self.items(newItems);
                self.isLoading(false);
            });
        }
    };
    
    return GameOverview;
});