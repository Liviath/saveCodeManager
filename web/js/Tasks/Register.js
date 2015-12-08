define('Tasks/Register', ['knockout', 'Utils/Network'], function(ko, Network) {
    
    var RegisterViewModel = function() {
        this.title = ko.observable('Register');
        this.name = ko.observable('');
        this.password = ko.observable('');
        this.passwordConfirmation = ko.observable('');
        this.errorMessage = ko.observable('');
        this.initializeComputedFunctions();
    };
    
    RegisterViewModel.prototype = {
        
        /**
         * Initializes the computed functions used to validate the form
         */
        initializeComputedFunctions: function() {
            this.validateName = ko.computed(function() {
                return this.name().match(/^[a-zA-Z0-9]{3,16}$/) ? true : false;
            }, this);
            this.validatePassword = ko.computed(function() {
                return this.password().match(/^.{6,32}$/) ? true : false;
            }, this);
            this.validatePasswordConfirmation = ko.computed(function() {
                return this.password() === this.passwordConfirmation();
            }, this);
            this.isValidated = ko.computed(function() {
                return this.validateName() && this.validatePassword() && this.validatePasswordConfirmation();
            }, this);
        },
        
        /**
         * Sends a request to the server to create a user.
         */
        createUser: function() {
            var data = {
                name: this.name(),
                password: this.password()
            };
            var self = this;
            Network.postRequest('user', data, function(msg, code) {
                if(code === 200) {
                    self.errorMessage(msg);
                } else {
                    window.location.reload();
                }
            });
        }
    }
    
    return RegisterViewModel;
});