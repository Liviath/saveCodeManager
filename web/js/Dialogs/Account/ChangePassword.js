define('Dialogs/Account/ChangePassword', ['knockout', 'Utils/Network', 'Utils/EventManager'], function(ko, Network, EventManager) {
    var HomeViewModel = function() {
    };
    
    HomeViewModel.prototype = {
        cancel: function() {
            EventManager.trigger('closeDialog');
        }
    };
    
    return HomeViewModel;
});