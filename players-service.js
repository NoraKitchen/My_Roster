var PlayersService = function(endpointUri, callback) {
    var playersData = [];
    
    this.printData = function(){  //works
        console.log(playersData[0])
    }
    
    //you should use filter rather than this though
    this.getPlayersBySomeValue = function(value){
        var selection = [];
        console.log("start")
        for (var i = 0; i < playersData.length; i++){
            var currentPlayer = playersData[i];
            var hasValue = false;
            console.log("looping players")
            for(var prop in currentPlayer){
                if(typeof currentPlayer[prop] === 'string' && currentPlayer[prop].toLowerCase() === value){
                    hasValue = true;
                }
            }
            if(hasValue){
                selection.push(currentPlayer)
            }
        }
        return selection;
    }

    this.getPlayersByTeam = function(teamName) {
        var playerSelection = playersData.filter(function(player) {
            if (player.pro_team === teamName) {
                return true;
                //.filter takes an array and filters it by a function--
                //it creates a new array for any of the items int he array for which the function returns true
            }
        })
        return playerSelection;
    }
    

    this.getPlayersByPosition = function(position) {
        var playerSelection = playersData.filter(function(player) {
            if (player.position === position) {
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
        
        
        
        // $.getJSON(apiUrl, function(data) { //the example had endpointUri here but i changed cause it did no work, day activity was more like this
        //         playersData = data.body.players;
        //         console.log('Player Data Ready')
        //         console.log('Writing Player Data to localStorage')
        //         localStorage.setItem('playerData', JSON.stringify(playerData)) //had a prob here, playerData not defined
        //         console.log('Finished Writing Player Data to localStorage')
        //         callback()
        //})
        
    }
    loadPlayersData(); //calls above function ever time you create new service
}

