var playerRoster = []

function Player(fullname, position, jersey, photo) {
    this.fullname = fullname;
    this.position = position;
    this.jersey = jersey;
    this.photo = photo;
}

function addPlayer(player) {
    playerRoster.push(player);
    drawPlayers();
}

function removePlayer() {
    var playerName = $(this).siblings(".full-name")[0].textContent;
    for (var i = 0; i < playerRoster.length; i++) {
        var currentPlayer = playerRoster[i];
        if (currentPlayer.fullname === playerName) {
            playerRoster.splice(i, 1)
        }
    }
    drawPlayers();
}

function drawPlayers() {
    var rosterElem = $(".player-roster");
    rosterElem.empty();
    for (var i = 0; i < playerRoster.length; i++) {
        var currentPlayer = playerRoster[i];
        if (currentPlayer.jersey) {
            var jerseyNumber = currentPlayer.jersey;
        }
        else {
            jerseyNumber = "<span class='jersey-no'>Jersey Not Available</span>";
        }
        rosterElem.append('<div class="panel panel-default player-card"><button class="btn btn-danger hover-button hidden"><i class="fa fa-trash" aria-hidden="true"></i></button><img class="player-image" src="' + currentPlayer.photo + '"><p class="full-name">' + currentPlayer.fullname + '</p><p>' + positionAbbr[currentPlayer.position] + '</p><p>' + jerseyNumber + '</p></div>');
    }
}



$(".player-entry-form").on("submit", function(event) {
    event.preventDefault();
    var form = this;

    for (var key in positionAbbr) {
        if (positionAbbr[key] === form.position.value) {
            var position = [key];
        }
    }

    var currentPlayer = new Player(form.name.value, position, form.num.value, form.image.value);
    addPlayer(currentPlayer);
    $(this).trigger("reset");
});

$(".player-roster").on("click", ".hover-button", removePlayer)

$(".player-roster, .selection-display").on({
    mouseenter: function() {
        $(this).find(".hover-button").toggleClass("hidden");
    },
    mouseleave: function() {
        $(this).find(".hover-button").toggleClass("hidden");
    }
}, ".player-card")