define('Utils/EventManager', [], function() {
    var subscribers = {};
    
    /**
     * Subscribe to an event.
     * @param {String} name
     * @param {String} id
     * @param {Callable} callback
     */
    function subscribe(name, id, callback) {
        if(typeof subscribers[name] === 'undefined') {
            subscribers[name] = {};
        }
        subscribers[name][id] = callback;
    }
    
    /**
     * Subscribe to an event.
     * @param {String} name
     * @param {String} id
     */
    function dispose(name, id) {
        delete subscribers[name][id];
    }
    
    /**
     * Subscribe to an event.
     * @param {String} name
     * @param {Mixed} params
     */
    function trigger(name, params) {
        for(var eventListener in subscribers[name]) {
            if(subscribers[name].hasOwnProperty(eventListener)) {
                subscribers[name][eventListener](params);
            }
        }
    }
    
    return {
        subscribe: subscribe,
        dispose: dispose,
        trigger: trigger
    };
});