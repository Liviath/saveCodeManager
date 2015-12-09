define('Dialogs/Game/AddGame', ['knockout', 'Utils/Network', 'Utils/EventManager'], function(ko, Network, EventManager) {
    var HomeViewModel = function() {
        this.amountOfSaveCodes = ko.observable("1");
        this.name = ko.observable('');
        this.errorMessage = ko.observable('');
        this.isValid = ko.computed(function() {
            return this.name().length > 0;
        }, this);
    };
    
    HomeViewModel.prototype = {
        createGame: function() {
            if (this.isValid) {
                var data = {
                    name: this.name(),
                    amountOfSaveCodes: parseInt(this.amountOfSaveCodes())
                }
                var self = this;
                Network.postRequest('game', data, function(data, code) {
                    if(code === 204) {
                        EventManager.trigger('closeDialog');
                    } else {
                        self.errorMessage(data);
                    }
                });
            }
        }
    }
    
    return HomeViewModel;
});