//business logic
var Player = function(turn) {
   this.scoreTotal = 0;
   this.currentScore = 0;
   this.turn = turn;
};
Player.prototype.takeTurn = function() {
   if (this.turn === true) {
      this.turn = false;
   } else {
      this.turn = true;
   }
};
Player.prototype.roll = function() {
   var rand = Math.floor(Math.random() * 6) + 1;
   this.currentScore = rand;
};
Player.prototype.addPoints = function(rollPoints) {
   this.scoreTotal += rollPoints;
};

var player1 = new Player(true);
var player2 = new Player(false);

var totalRoll;

//User interface logic
$(document).ready(function() {
   var playerOneName;
   var playerTwoName;

   $("form#signup-form").submit(function(event) {
      event.preventDefault();
      totalRoll = parseInt($("#rolled-total").text());
       playerOneName = $("player-one-signup").val();
       playerTwoName = $("player-two-signup").val();

      if (playerOneName == "" || playerTwoName == "") {
         alert("please enter a name for each player");
      }

      $(".player-setup").slideUp(600);
      $("#player-one-name").text(playerOneName);
      $("#player-two-name").text(playerTwoName);
      $("#player-msg").text(playerOneName + ", GO!");
      $(".game").slideDown(600);

   });
   // end submit
   $("#roll").click(function() {
      if (player1.turn == true) {
         if (player1.scoreTotal >=100 || player2.scoreTotal >=100) {
            $("button").attr("readonly, true");
            alert("WE HAVE A WINNER!!!!!!  ;)");
         } else {
            player1.roll();
            if (player1.currentScore == 1) {
               player1.takeTurn();
               player2.takeTurn();
               totalRoll = 0;
               $("#hold").attr("disabled", true).removeClass("btn-danger");
               $(this).addClass("roll-again").text("Roll AGAIN?");
               $("#rolled-total").text(totalroll);
               $("#rolled-number").text(player2.currentScore);

            }
         }

      }
   });
   // end click
   $("#hold").click(function() {
      if (player1.turn === true) {
         player1.takeTurn();
         player2.takeTurn();
         player1.addPoints(totalRoll);
         totalRoll = 0;
         $(this).attr("disabled", true).removeClass("btn-danger");
         $("#rolled-total").text("0");
         $(".p1-total-score").text(player1.scoreTotal);
         $("#roll").text("Roll");
         $("player-msg").text(playerTwoName + ", YOUR TURN!");
      } else {
         player1.takeTurn();
         player2.takeTurn();
         player2.adddPoints(totalRoll);
         totalRoll = 0;
         $(this).attr("disabled", true).removeClass("btn-danger");
         $("#rolled-total").text("0");
         $(".p1-total-score").text(player2.scoreTotal);
         $("#roll").text("Roll");
         $("player-msg").text(playerOneName + ", YOUR TURN!");


      }
   });
});
