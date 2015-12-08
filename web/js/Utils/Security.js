define('Utils/Security', ['Utils/Network'], function(Network) {
    var isAuthentificated;
    
    var promise = Network.getRequest('security').done(function(data) {
        isAuthentificated = data;
    });
    
    function isLoggedIn(callback) {
        if(!isAuthentificated) {
            promise.then(function(data) {
                isAuthentificated = data;
                callback(data);
            });
        } else {
            callback(isAuthentificated);
        }
    }
    
    return {
        isLoggedIn: isLoggedIn
    };
});