var playerRoster = []

function Player (name, position, num, image) {
  this.name = name;
  this.position = position;
  this.num = num;
  this.image = image;
}

function addPlayer (player) {
  playerRoster.push(player);
  drawPlayers();
}

function drawPlayers() {
    var rosterElem = $(".player-roster");
    rosterElem.empty();
    for (var i = 0; i < playerRoster.length; i++) {
        var currentPlayer = playerRoster[i];
        rosterElem.append('<div class="panel panel-default player-card"><button class="btn btn-danger delete-button hidden"><i class="fa fa-trash" aria-hidden="true"></i></button><img class="player-image" src="' + currentPlayer.image + '"><p>' + currentPlayer.name + '</p><p>' + currentPlayer.position + '</p><p class="player-number">' + currentPlayer.num + '</p></div>');
    }
}


/*originally had 
$("delete-button").on("click", ".player-card", function() {
    $(this).remove();
})

also why only 'textContent'
*/

function removePlayer () {
    var playerNumber = $(this).siblings(".player-number")[0].textContent;
    for (var i = 0; i < playerRoster.length; i++) {
        var currentPlayer = playerRoster[i];
        if (currentPlayer.num === playerNumber) {
            playerRoster.splice(i, 1)
        }
    }
    drawPlayers();
}



$("form").on("submit", function(event){
	event.preventDefault();
    var form = this;
    var currentPlayer = new Player(form.name.value, form.position.value, form.num.value, form.image.value);
    addPlayer(currentPlayer);
    $(this).trigger("reset");
});

$(".player-roster").on("click", ".delete-button", removePlayer)

$(".player-roster").on({
    mouseenter: function(){
        $(this).find(".delete-button").toggleClass("hidden");
    },
    mouseleave: function(){
        $(this).find(".delete-button").toggleClass("hidden");
    }
}, ".player-card")