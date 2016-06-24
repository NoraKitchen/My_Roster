---
#Players Service & Encapsulation
---

We are going to briefly talk about one of the three pillars of object oreinted programming, Encapsulation.
We discussed the important role it plays in software development, and how it promotes effecient maintainable code.

Encapsulation is an Object Oriented Programming concept that binds together the data and functions that manipulate the data, and that keeps both safe from outside interference and misuse. Data encapsulation led to the important OOP concept of data hiding.

While the concept of Encapulation is very broad, and can be difficult to pull of completely we are attempting to break it down into a few basic principles.

- Single Responsibility, or "One function, One job".
  - Do your best to ensure a function doesn't do too much. If it is doing too much
  try to separate(refactor) out each task into other smaller functions.

- Encapsulate/WrapUp common behavior.
  - If you have functions(methods) or data(properties) that are similar in behaviour, wrap them up into a single unit, using a class(constructor).
  
- "Keep your private parts private".
  - Use closure to keep functionality specific to an object within the object itself. 

Now lets discuss how we are going to get player data from the CBS API and how we can encapsulate that data into it's own unit. Our proof of concept was very basic.

  - Retrieve player data from an external source.
    - Only load this data one time, then store it to a local variable.
  - Filter player data by certain properties such as Name, Position, Team, etc...
    - To make it simple we started with 2 basic functions.
      - getPlayersByTeam(teamName);
        - this method recieves a name of a team, returns an array of all players on that team.  
      - getPlayersByPosition(position);
        - this method recieves a players position, return an array of all players with that position.
    - Each function relys on the data retrived from the external source.  
 
Because every item in our proof of concept is similar in behavior, we will want to place everything inside a common unit. 
Lets call it PlayersService. 

PlayersService is just a constructor.
```javascript
  var PlayersService = function(){
    //...
  } 
```

Looking back at our proof of concept, we know our service needs to have player data, and a few functions.

```javascript
var PlayersService = function(){
  var playersData = [];
  
  this.getPlayersByTeam = function(teamName){
    //return all an array of all players that match the given teamName.
  }
  
  this.getPlayersByPosition = function(position){
    //return all an array of all players that match the given position.
  }
} 
``` 

Once we have the skeleton laid out, we can implement the functionality.
We will use a new method called <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">.filter()</a>.

```javascript
var PlayersService = function(){
  var playersData = [];
  
  this.getPlayersByTeam = function(teamName){
    playersData.filter(function(player){
      if(player.team == teamName){
        return true;
    });
  }
  
  this.getPlayersByPosition = function(position){
    playersData.filter(function(player){
      if(player.position == position){
        return true;
    });
  }
} 
```

Now we just need to write the function to get the player data from the API. And call
that function every time we create a new Players Service. Since we don't want to hard code
a url to the API in the service, we are accepting it as a constructor parameter.

```javascript
var PlayersService = function(endpointUri, callback){
    var playersData = [];
    
    this.getPlayersByTeam = function(teamName){
    	playersData.filter(function(player){
    	  if(player.team == teamName){
    	    return true;
    	});
    }
    
    this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
          if(player.position == position){
            return true;
        });
    }
    
    function loadPlayersData(){
      
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      
      var localData = localStorage.getItem('playerData');
      if(localData){
      	playerData = JSON.parse(localData);
      	return callback(); 
      	//return will short circut the loadPlayersData function
      	//this will prevent the code below from ever executing
      }
      
      var url = "http://bcw-getter.herokuapp.com/?url=";
      var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(endpointUri, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playerData', JSON.stringify(playerData))
          console.log('Finished Writing Player Data to localStorage')
          callback()
        });
    }	
loadPlayersData(); //call the function above every time we create a new service
} 
```

And there you have it. A basic, easy to use Players Service. To make it work, we will go back to our main app.js and instantiate the PlayerService. The PlayerService is going out to make an async call we will want to make sure our page shows some sort of loader while we are waiting for the data to load. To accomplish this task we can setup a simple bool for loading and then flip that bool once the ready function is called by our player service.

```javascript
var loading = true; //Start the spinner
var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var playerService = new PlayerService(apiUrl, ready);

function ready(){
    loading = false; //stop the spinner

    //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
    
    $('some-button').on('click',function(){
      var teamSF = playerService.getPlayersByTeam("SF");
    }
}
    
```

Happy CODING!  
 
---

#Array.Filter
---
In its simplest form, Array.filter is a way to filter a large array intto a smaller array. 

Let's look at the following example of filtering an array using Array.forEach();
In the exmples below, our goal is to filter on all the players on the team "SF".
```javascript
var playersData = [] //Assume this is a large collection of players.
var filterdPlayers = [];
playersData.forEach(function(player){
    if(player.team === "SF"){ //check to see if they are on the team SF
      filteredPlayers.push(player); //if they are, add them to the array.
    }
});

console.log(filteredPlayers); //this should be all players that are on SF.
```

That's not too much code, and pretty easy to follow, however, javascript has an easier, cleaner way
to filter arrays. This is where we use Array.filter() instead of Array.forEach().

```javascript
var playersData = [] //Assume this is a large collection of players.

var filterdPlayers = playersData.filter(function(player){ //replace forEach with filter.
    if(player.team === "SF"){ //check to see if they are on the team SF
      return true; //instead of adding it to an array, just return true.
    }
});

console.log(filteredPlayers); //this should be all players that are on SF.
```

The code is very similar, but we do not need to push any objects to a temporary array.
Array.filter() works by looking at the response from the callback. If we return TRUE inside 
the callback it will add the current item to the filtered list, if we return FALSE or nothing, 
then it will excluded the current item from the filtered list.

Note, it does not modify the original array, instead it creates a new one.
