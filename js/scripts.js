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

   totalRoll = parseInt($("#rolled-total").text());

   $("#signup-form").submit(function(event) {
      event.preventDefault();


       playerOneName = $("player-one-signup").val();
       playerTwoName = $("player-two-signup").val();

      if (playerOneName == "" || playerTwoName == "") {
         alert("please enter a name for each player");
         return;
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
            if (player1.currentScore === 1) {
               player1.takeTurn();
               player2.takeTurn();
               totalRoll = 0;
               $("#hold").attr("disabled", true).removeClass("btn-danger");
               $("#rolled-total").text("0");
               $("#rolled-number").text(player1.currentScore);
               $(this).text("Roll");
               $("#player-msg").text(playerTwoName + ", GO!");
            }
            else {
               totalRoll += player1.currentScore;
               $("#hold").attr("disabled", false).addClass("btn-danger");
               $("rolled-number").text(player1.currentScore);
               $("#rolled-total").text(totalRoll);
               $(this).addClass("roll-again").text("ROLL AGAIN?")
            }
         }

      }
      else {
         if (player2.scoreTotal >= 100 || player1.scoreTotal >= 100) {
            $("button").attr("readonly", true);
         }
         else {
            player2.roll();
            if (player2.currentScore ===1) {
               player1.takeTurn();
               player2.takeTurn();
               totalRoll = 0;
               $("#hold").attr("disabled", true).removeClass("btn-danger");
               $("#rolled-total").text("0");
               $("#rolled-number").text(player2.currentScore);
               $(this).removeClass("roll-again").text("ROLL");
               totalRoll = 0;
               $("player-msg").text(playerOneName + ", GO!");
            }
            else {
               totalRoll += player2.currentScore;
               $("#hold").attr("disabled", false).addClass("btn-danger");
               $(this).addClass("roll-again").text("ROLL AGAIN?");
               $("#rolled-total").text(totalRoll);
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
