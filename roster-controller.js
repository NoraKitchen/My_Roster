var loading = true; //Start the spinner
var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var playerService = new PlayersService(apiUrl, ready);
var currentFilter = [];

function ready() {
    loading = false; //stop the spinner


    $(".find-player-form").on("submit", function(event) {
        event.preventDefault();
        var form = this;
        var teamSelected = form.teamName.value;
        currentFilter = playerService.getPlayersByTeam(teamSelected);
        $(form).trigger("reset");
        drawSelection();
    });


    function drawSelection() {
        var selectionDisplay = $(".selection-display");
        selectionDisplay.empty();
        for (var i = 0; i < currentFilter.length; i++) {
            var currentPlayer = currentFilter[i];
            selectionDisplay.append('<div class="panel panel-default player-card"><button class="btn btn-success hover-button hidden"><i class="fa fa-plus" aria-hidden="true"></i></button><img class="player-image" src="' + currentPlayer.photo + '"><p class="full-name">' + currentPlayer.fullname + '</p><p>' + currentPlayer.position + '</p><p>' + currentPlayer.jersey + '</p></div>');
        }
    }
    
    $(".selection-display").on("click", ".hover-button", function(event){
        event.preventDefault();
        var playerName = $(this).siblings(".full-name")[0].textContent;
        for (var i = 0; i < currentFilter.length; i++) {
            var currentPlayer = currentFilter[i];
            if (currentPlayer.fullname === playerName) {
                currentFilter.splice(i, 1)
                addPlayer(currentPlayer);
            }
        }
        drawSelection()
    })
    


}