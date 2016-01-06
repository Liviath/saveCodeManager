define('Dialogs/Account/DeleteAccount', ['knockout', 'Utils/Network', 'Utils/EventManager'], function(ko, Network, EventManager) {
    var DeleteAccountViewModel = function() {
    };
    
    DeleteAccountViewModel.prototype = {
        cancel: function() {
            EventManager.trigger('closeDialog');
        }
    }
    
    return DeleteAccountViewModel;
});