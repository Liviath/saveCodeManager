define('Tasks/Game/Game', ['knockout', 'Utils/Network', 'Tasks/Game/Code'], function(ko, Network, Code) {
    
    var Game = function(data) {
        this.name = data.name;
        this.amountOfSaveCodes = data['amount_of_save_codes'];
        this.isSelected = ko.observable(true);
        this.newDescription = ko.observable('');
        this.newCode = ko.observable('');
        this.addCode = ko.observable(false);
        this.gameId = data['id'];
        this.items = ko.observableArray([]);
        this.isLoading = ko.observable(true);
        this.refresh();
    };
    
    Game.prototype = {
        select: function() {
            this.isSelected(!this.isSelected());
            if(!this.isSelected()) {
                this.addCode(false);
            }
        },
        
        toggleAddCode: function() {
            this.addCode(!this.addCode());
            this.isSelected(this.addCode());
        },
        
        saveCode: function() {
            var data = {
                description: this.newDescription(),
                code: this.newCode(),
                gameId: this.gameId
            };
            var self = this;
            Network.postRequest('code', data, function(data, code) {
                if(code === 204) {
                    self.addCode(false);
                }
            });
        },
        
        refresh: function() {
            var data = {
                gameId: this.gameId
            };
            var self = this;
            Network.getRequest('code/all', data, function(data) {
                for(var item in data) {
                    if(data.hasOwnProperty(item)) {
                        self.items.push(new Code(data[item]));
                    }
                }
                self.isLoading(false);
                console.log(self.items());
            });
        }
    };
    
    return Game;
});