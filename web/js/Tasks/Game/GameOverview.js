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
        openAddGameDialog: function() {
            EventManager.trigger('openDialog', 'dialog-add-game-template');
        },
        
        refreshItems: function() {
            this.items([]);
            var self = this;
            Network.getRequest('game/all', {}, function(data) {
                for(var item in data) {
                    if(data.hasOwnProperty(item)) {
                        self.items.push(new Game(data[item]));
                    }
                }
                self.isLoading(false);
            });
        }
    };
    
    return GameOverview;
});