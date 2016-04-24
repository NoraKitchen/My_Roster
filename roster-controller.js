var loading = true; //Start the spinner
var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var playerService = new PlayersService(apiUrl, ready);
var currentFilter = [];

var positionAbbr = {
    QB: "Quarterback",
    RB: "Running Back",
    FB: "Fullback",
    WR: "Wide Receiver",
    TE: "Tight End",
    OL: "Offensive Lineman",
    C: "Center",
    G: "Guard",
    LG: "Left Guard",
    RG: "Right Guard",
    T: "Tackle",
    LT: "Left Tackle",
    RT: "Right Tackle",
    K: "Kicker",
    KR: "Kick Returner",
    DL: "Defensive Lineman",
    DE: "Defensive End",
    DT: "Defensive Tackle",
    NT: "Nose Tackle",
    LB: "Linebacker",
    ILB: "Inside Linebacker",
    OLB: "Outside Linebacker",
    MLB: "Middle Linebacker",
    DB: "Defensive Back",
    CB: "Cornerback",
    FS: "Free Safety",
    SS: "Strong Safety",
    S: "Safety",
    P: "Punter",
    PR: "Punt Returner"
}



function ready() {
    loading = false; //stop the spinner

    function drawPositionOptions() {
        for (var key in positionAbbr) {
            $(".player-form select").append("<option>" +positionAbbr[key]+ "</option>")
        }
    }


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

            if (currentPlayer.jersey) {
                var jerseyNumber = currentPlayer.jersey;
            }
            else {
                jerseyNumber = "<span class='jersey-no'>Jersey Not Available</span>";
            }

            selectionDisplay.append('<div class="panel panel-default player-card"><button class="btn btn-success hover-button hidden"><i class="fa fa-plus" aria-hidden="true"></i></button><img class="player-image" src="' + currentPlayer.photo + '"><p class="full-name">' + currentPlayer.fullname + '</p><p>' + positionAbbr[currentPlayer.position] + '</p><p>' + jerseyNumber + '</p></div>');
        }
    }

    $(".selection-display").on("click", ".hover-button", function(event) {
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

drawPositionOptions();

}