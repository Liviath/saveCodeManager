define('Tasks/Login', ['knockout', 'Utils/Network'], function(ko, Network) {
    
    var LoginViewModel = function() {
        this.name = ko.observable('');
        this.password = ko.observable('');
        this.errorMessage = ko.observable('');
    };
    
    LoginViewModel.prototype = {
        
        /**
         * Sends a request to the server to create a user.
         */
        login: function() {
            var data = {
                name: this.name(),
                password: this.password()
            };
            var self = this;
            Network.postRequest('login', data, function(msg, code) {
                if(code === 200) {
                    self.errorMessage(msg);
                } else {
                    window.location.reload();
                }
            });
        }
    };
    
    return LoginViewModel;
});