var PlayersService = function(endpointUri, callback) {
    var playersData = [];
    
        this.getAllPlayers = function() {
            return playersData;
        }
    
        this.getPlayersBySomeValue = function(prop, enteredValue) {
        var playerSelection = playersData.filter(function(player) {
            if (player[prop] && player[prop].toString().toUpperCase() === enteredValue.toUpperCase()) {
                return true;
            }
        })
        return playerSelection;
    }
    
    function loadPlayersData() {
        //Check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playerData')
        if (localData) {
            console.log("data existed")
            playersData = JSON.parse(localData);
            return callback();
            //return will short circut loadPlayerData function, stop code below from executing
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var modifiedUrl = url + encodeURIComponent(endpointUri);
        
        $.get(modifiedUrl, function(response){
            var data = JSON.parse(response)
            playersData = data.body.players.filter(function(player){
                if(player.pro_status === 'A'){
                    return player;
                }
            })
            callback();
        })
        
    }
    loadPlayersData();
}

