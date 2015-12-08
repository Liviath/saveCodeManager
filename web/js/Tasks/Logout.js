define('Tasks/Logout', ['knockout', 'Utils/Network'], function(ko, Network) {
    
    var LogoutViewModel = function() { 
        this.logout();
    };
    
    LogoutViewModel.prototype = {
        
        /**
         * Sends a request to the server to create a user.
         */
        logout: function() {
            Network.getRequest('logout', null, function() {
                window.location.reload();
            });
        }
    };
    
    return LogoutViewModel;
});