define('Utils/Network', ['jquery'], function($) {
    var isAppDev = (location.href.indexOf('app_dev.php') !== -1);
    
    /**
     * Sends a GET request to a specific url.
     * @param {String} url
     * @param {Object} data
     * @returns {jqXHR}
     */
    function getRequest(url, data) {
        url = preprocessUrl(url);
        return $.get(url, data);
    }
    
    /**
     * Sends a POST request to a specific url.
     * @param {String} url
     * @param {Object} data
     * @returns {jqXHR}
     */
    function postRequest(url, data) {
        url = preprocessUrl(url);
        return $.post(url, data);
    }
    
    /**
     * Preprocesses the url
     * @param {type} url
     * @returns {String}
     */
    function preprocessUrl(url) {
        if (isAppDev) {
            url = 'app_dev.php/' + url;
        }
        return url;
    }
    
    return {
        getRequest: getRequest,
        postRequest: postRequest
    }
});