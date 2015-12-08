define('Tasks/Game/GameOverview', ['knockout', 'Utils/Network', 'Utils/EventManager'], function(ko, Network, EventManager) {
    
    var GameOverview = function() {
        this.isLoading = ko.observable(true);
        this.games = ko.observableArray([]);
        
        this.isEmpty = ko.computed(function() {
            return this.games().length === 0;
        }, this);
        
        this.isLoading(false);
    };
    
    GameOverview.prototype = {
        openAddGameDialog: function() {
            EventManager.trigger('openDialog', 'dialog-add-game-template');
        }
    };
    
    return GameOverview;
});