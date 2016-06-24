# NFL Roster

This app was created through the third week of BoiseCodeWorks Immersive Full Stack program. The project utilized HTML, CSS, Bootstrap, JavaScript, and extensive use of jQuery.

The assignment was given to students with no pre-existing code/to be made from scratch, though students were given a step-by-step walk-through of how to create the service to get data from the NFL player api, since it was their first time attempting such an activity.

###Tasks

In this app, my job was to utilize jQuery to...

1. Make a form that would create player cards and display them to the user's personal roster
2. Be able to delete player cards from the roster
3. Pull all (or filtered) NFL player data from an api and display cards for the returned players as search results
4. Allow the returned NFL player cards to be added or removed from the user's roster

##Process highlights, potential improvements

I didn't know a lot about jQuery before starting this project, and was pretty intimidated by it at first. By the end, though, I definitely felt like I had a better handle on it. The code organization is a little funny and could do with some refactoring, but I was pretty happy with how my roster turned out in the end. Though I'll never be a master web designer, I even had some extra time to take a stab at making it a little more visually appealing than my previous projects.

###Styling hiccups

CSS and styling never having been my strong suit, I had not spent as much time trying to style things nicely in the past outside some cloning exercises. Now that I was trying, I found myself struggling at almost every turn.

I wanted to use Bootstrap accordions to hide and show parts of the left side bar, but could not make them work. I eventually realized I merely needed to link the Bootstrap JS script, a fact I can only assume was so obvious no one felt it worth stating in any instructions or tutorials.

As a beginner, I've definitely run into other situations in which “common knowledge” I wasn't aware of tripped me up pretty hard. Though I did figure out my accordion issue in the end, when I look back I wish I had recognized something was amiss and asked for help. Recognizing a problem is probably a simple thing you just don't know and getting the right kind of help can instantly turn a three hour problem into a one minute solution.

###Lesson learned
Another styling issue I had was with keeping my background image in place while the user scrolled through the potentially long list of NFL player cards. Unable to figure it out, I went so far as to edit my background image to blur the bottom so as not to give it an abrupt edge when users scrolled past it.

Now I know that problem simply should not be that hard. Just now, I turned to my class's resident CSS master sitting next to me, had a 30 second conversation, learned a new CSS property (background-attachment? Who knew!), and completely solved my problem.

###Repetitive code

Like a lot of my hurriedly completed bootcamp projects, this code could probably do with some better organization, refining, and reduced repetition. In particular, I can't help but feel like drawing player cards to the user roster and drawing NFL player cards from search results are similar enough tasks they might be able to share a function rather than having two separate ones. 

###To see the original instructions for this activity, visit README2.md and PlayerService.md