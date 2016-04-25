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

//this was taken from https://gist.github.com/smykes/368afa60c1a75b3d5468
//i could not figure out how to make using the files separately work, hopefully we will learn that later?
//also is there a particular crediting process/ettiquite?
var nflTeams = [
    {
        "city": "Arizona",
        "name": "Cardinals",
        "abr": "ARI",
        "conf": "NFC",
        "div": "West"
    },
    {
        "city": "Atlanta",
        "name": "Falcons",
        "abr": "ATL",
        "conf": "NFC",
        "div": "South"
    },
    {
        "city": "Baltimore",
        "name": "Ravens",
        "abr": "BAL",
        "conf": "AFC",
        "div": "North"
    },
    {
        "city": "Buffalo",
        "name": "Bills",
        "abr": "BUF",
        "conf": "AFC",
        "div": "EAST"
    },
    {
        "city": "Carolina",
        "name": "Panthers",
        "abr": "CAR",
        "conf": "NFC",
        "div": "South"
    },
    {
        "city": "Cincinati",
        "name": "Bengals",
        "abr": "CIN",
        "conf": "AFC",
        "div": "North"
    },
    {
        "city": "Chicago",
        "name": "Bears",
        "abr": "CIN",
        "conf": "NFC",
        "div": "North"
    },
    {
        "city": "Cleveland",
        "name": "Browns",
        "abr": "CLE",
        "conf": "AFC",
        "div": "North"
    },
    {
        "city": "Dallas",
        "name": "Cowboys",
        "abr": "DAL",
        "conf": "NFC",
        "div": "East"
    },
    {
        "city": "Denver",
        "name": "Broncos",
        "abr": "DEN",
        "conf": "AFC",
        "div": "West"
    },
    {
        "city": "Detroit",
        "name": "Lions",
        "abr": "DET",
        "conf": "NFC",
        "div": "North"
    },
    {
        "city": "Green Bay",
        "name": "Packers",
        "abr": "GB",
        "conf": "NFC",
        "div": "North"
    },
    {
        "city": "Houston",
        "name": "Texans",
        "abr": "HOU",
        "conf": "AFC",
        "div": "South"
    },
    {
        "city": "Indianapolis",
        "name": "Colts",
        "abr": "IND",
        "conf": "AFC",
        "div": "South"
    },
    {
        "city": "Jacksonville",
        "name": "Jaquars",
        "abr": "JAX",
        "conf": "AFC",
        "div": "South"
    },
    {
        "city": "Kansas City",
        "name": "Chiefts",
        "abr": "KC",
        "conf": "AFC",
        "div": "West"
    },
    {
        "city": "Miami",
        "name": "Dolphins",
        "abr": "MIA",
        "conf": "AFC",
        "div": "East"
    },
    {
        "city": "Minnesota",
        "name": "Vikings",
        "abr": "MIN",
        "conf": "AFC",
        "div": "North"
    },
    {
        "city": "New England",
        "name": "Patriots",
        "abr": "NE",
        "conf": "AFC",
        "div": "East"
    },
    {
        "city": "New Orleans",
        "name": "Saints",
        "abr": "NO",
        "conf": "NFC",
        "div": "South"
    },
    {
        "city": "New York",
        "name": "Giants",
        "abr": "NYG",
        "conf": "NFC",
        "div": "East"
    },
    {
        "city": "New York",
        "name": "Jets",
        "abr": "NYJ",
        "conf": "AFC",
        "div": "East"
    },
    {
        "city": "Oakland",
        "name": "Raiders",
        "abr": "OAK",
        "conf": "AFC",
        "div": "West"
    },
    {
        "city": "Philidelphia",
        "name": "Eagles",
        "abr": "PHI",
        "conf": "NFC",
        "div": "East"
    },
    {
        "city": "Pittsburgh",
        "name": "Steelers",
        "abr": "PIT",
        "conf": "AFC",
        "div": "North"
    },
    {
        "city": "San Diego",
        "name": "Chargers",
        "abr": "SD",
        "conf": "AFC",
        "div": "West"
    },
    {
        "city": "Seattle",
        "name": "Seahawks",
        "abr": "SEA",
        "conf": "NFC",
        "div": "West"
    },
    {
        "city": "San Francisco",
        "name": "49ers",
        "abr": "SF",
        "conf": "NFC",
        "div": "West"
    },
    {
        "city": "St. Louis",
        "name": "Rams",
        "abr": "STL",
        "conf": "NFC",
        "div": "West"
    },
    {
        "city": "Tampa Bay",
        "name": "Buccaneers",
        "abr": "TB",
        "conf": "NFC",
        "div": "South"
    },
    {
        "city": "Tennessee",
        "name": "Titants",
        "abr": "TEN",
        "conf": "AFC",
        "div": "South"
    },
    {
        "city": "Washington",
        "name": "Redskins",
        "abr": "WAS",
        "conf": "NFC",
        "div": "East"
    }
]

function drawPositionOptions() {
    for (var key in positionAbbr) {
        $("form select").append("<option>" + positionAbbr[key] + "</option>")
    }
}

drawPositionOptions();



function ready() {
    loading = false; //stop the spinner
    $("button").removeClass("disabled");
    $(".loading-message").fadeTo("slow", 0.0)

    function makeSearchTabActive() {
        //why aren't my aria-expanded changes working? i ventured think they are what controls which tab is highlighted/in the forefront, yes?
        $("#my-team").removeClass("in active");
        $("#my-team-button").removeClass("active")
        $("#my-team-link").attr("aria-expanded", "false");
        $("#search").addClass("in active");
        $("#search-button").addClass("active");
        $("#search-link").attr("aria-expanded", "true");
    }


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
        makeSearchTabActive()
    }


    $(".show-all-form").on("submit", function(event) {
        event.preventDefault();
        currentFilter = playerService.getAllPlayers();
        $("#search-results-info").text("Displaying all " + currentFilter.length + " NFL players");
        drawSelection();
    });


    $(".find-player-by-team-form").on("submit", function(event) {
        event.preventDefault();
        var form = this;
        var teamSelected = form.teamName.value;

        for (var i = 0; i < nflTeams.length; i++) {
            var currentTeam = nflTeams[i];
            if (currentTeam.name.toUpperCase() === teamSelected.toUpperCase() || currentTeam.city.toUpperCase() === teamSelected.toUpperCase()) {
                var teamSelectedAbr = currentTeam.abr;
            }
        }

        currentFilter = playerService.getPlayersBySomeValue("pro_team", teamSelectedAbr);
        $("#search-results-info").text("Displaying " + currentFilter.length + " search results for Team Name/City: " + teamSelected);
        $(form).trigger("reset");
        drawSelection();
    });

    $(".find-player-by-position-form").on("submit", function(event) {
        event.preventDefault();
        var form = this;
        var positionSelected = form.position.value;

        for (var key in positionAbbr) {
            if (positionAbbr[key] === positionSelected) {
                var positionSelectedKey = key;
            }
        }

        currentFilter = playerService.getPlayersBySomeValue("position", positionSelectedKey);
        $("#search-results-info").text("Displaying " + currentFilter.length + " search results for Position: " + positionSelected);
        $(form).trigger("reset");
        drawSelection();
    });

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

}