requirejs.config({
    //By default load any module IDs from js
    baseUrl: 'js',
    paths: {
        knockout: 'ext/knockout-3.4.0',
        jquery: 'ext/jquery-1.11.3'
    }
});

define('main', ['knockout', 'Utils/Security', 'Tasks/MenuHandler'], function(ko, Security, MenuViewModel) {
    var mainViewModel = function() {
        this.menuViewModel = new MenuViewModel();
        this.test = 'abc';
    };
    
    var mainTemplateName = ko.observable('template-login');
    var mainTemplateViewModel = ko.observable();
    ko.applyBindings(new mainViewModel());
});