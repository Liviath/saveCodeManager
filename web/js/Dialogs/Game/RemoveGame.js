define('Dialogs/Game/RemoveGame', ['knockout', 'Utils/Network', 'Utils/EventManager'], function(ko, Network, EventManager) {
    var HomeViewModel = function() {
        this.gameId = 0;
    };
    
    HomeViewModel.prototype = {
        deleteGame: function() {
            var url = 'deleteGame/' + this.gameId;
            Network.postRequest(url, {}, function() {
                EventManager.trigger('closeDialog');
            });
        },
        
        init: function(options) {
            this.gameId = options;
        },
        
        keepGame: function() {
            EventManager.trigger('closeDialog');
        }
    }
    
    return HomeViewModel;
});