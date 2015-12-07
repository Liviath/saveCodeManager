define('Utils/Security', ['Utils/Network'], function(Network) {
    var isAuthentificated;
    
    function isLoggedIn() {
        return isAuthentificated;
    }
    
    Network.getRequest('security').done(function(data) {
//        alert(data);
    });
    
    return {
        isLoggedIn: isLoggedIn
    };
});