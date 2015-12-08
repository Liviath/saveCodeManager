define('Utils/Routing', ['Utils/Network', 'Utils/EventManager'], function(Network, EventManager) {
    var modules = [];
    var moduleConfig;
    
    var prom = Network.getRequest('config').then(function(data) {
        moduleConfig = data;
    });
    
    /**
     * Gets an module by a template id
     * 
     * @param {String} templateId
     * @param {Callable} callback
     */
    function getModuleByTemplateId(templateId, callback) {
        if(modules[templateId]) {
            callback(new modules[templateId]());
        } else {
            if(!moduleConfig) {
                prom.then(function() {
                    loadModule(templateId, callback);
                });
            } else {
                loadModule(templateId, callback);
            }
        }
    }
    
    /**
     * Gets the path to a view model by the template id
     * @param {String} templateId
     * @returns {data.viewModel|Boolean}
     */
    function getViewModelByTemplateId(templateId) {
        var viewModel = false;
        for(var route in moduleConfig) {
            if(moduleConfig.hasOwnProperty(route)) {
                if(moduleConfig[route].templateId === templateId) {
                    viewModel = moduleConfig[route].viewModel;
                }
            }
        }
        return viewModel;
    }
    
    /**
     * Loads a module and calls a callback, once the module was loaded.
     * 
     * @param {String} templateId
     * @param {Callable} callback
     */
    function loadModule(templateId, callback) {
        var route = getViewModelByTemplateId(templateId);
        if(!route) {
            console.error('Could not find view model for template id ' + templateId);
            return;
        }
        require([route], function(moduleFnct) {
            if(typeof moduleFnct !== 'function') {
                console.error('Type of require modul ' + route + ' is ' + typeof moduleFnct + ', function expected');
                return;
            }
            modules[templateId] = moduleFnct;
            callback(new modules[templateId]());
        });
    }
    
    return {
        getModuleByTemplateId: getModuleByTemplateId
    };
});