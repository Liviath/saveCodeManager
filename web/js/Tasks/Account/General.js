define('Tasks/Account/General', ['knockout', 'Utils/EventManager'], function(ko, EventManager) {
    
    /**
     * Construktor
     */
    var General = function() {
    };
    
    General.prototype = {
        changePassword: function() {
            EventManager.trigger('openDialog', 'dialog-change-password-template');
        },
        
        deleteAccount: function() {
            EventManager.trigger('openDialog', 'dialog-delete-account-template');
        }
    }
    
    return General;
});