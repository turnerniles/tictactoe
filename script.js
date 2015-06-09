var ref = new Firebase('https://nttictactoe.firebaseio.com/');

$(document).ready(function () {

  // var $player1Input = $('#player1'); //These are defined at the bottom in the input focusout code.
  // var $player2Input = $('#player2');

//Get data from firebase and declare board object with values based on what is stored
//in firebase
  ref.on("value", function(snapshot) {
    game.boardSize = snapshot.val().currentBoardSize;
    game.playerScore = snapshot.val().storedPlayerScore;
    game.computerScore = snapshot.val().storedComputerScore;
    game.board = snapshot.val().storedBoard;
    game.chooser = snapshot.val().chooser;
    $player1Input.val(snapshot.val().player1);
    $player2Input.val(snapshot.val().player2);
    game.initiate();

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

});

var game =
{
  //Render the board and display player names
  initiate: function()
  {
    console.log("initiate");
    this.renderBoard();

    $('#playerScore').text(game.playerScore);
    $('#computerScore').text(game.computerScore);

  },
//Reset the game
  resetGame: function()
  {
  this.clearBoardArray();
  this.clearBoardDisplay();
  this.boardSize = 3;
  this.playerScore = 0;
  this.computerScore = 0;
  $player1Input.val("");
  $player2Input.val("");
  this.makeBoard();
  this.storeStuff();

  },
  //Store stuff in firebase function
  storeStuff: function(){

var p1Text = $player1Input.val();
var p2Text = $player2Input.val();

    ref.set(
          {storedComputerScore: game.computerScore,
          storedPlayerScore: game.playerScore,
          currentBoardSize: game.boardSize,
          storedBoard: game.board,
          player1: p1Text,
          player2: p2Text,
          chooser: game.chooser
          });

  },
  //Makes a new board. Only used in resets.
  makeBoard: function()
  {
    this.board = [];
    for (var i = 0; i<this.boardSize;i+=1)
      {
        var row = [];
            for (var j = 0; j<this.boardSize; j+=1)
              {
                row.push("");
              }
        this.board.push(row);
      };
  },
  //Renders the board after starting up and after each turn
  renderBoard: function()
  {
    this.clearBoardDisplay();
    var $board = $('#board');

    for(var i = 0; i < this.boardSize; i+=1)
    {
      for(var j = 0; j < this.boardSize; j+=1)
      {
//If there is an X or O in the array board data then append an X or O to the screen
        var $div = $('<div class = "box">');
          if (this.board[j][i] === "x")
            {
              $xcross1 = $('<div class = "xcross1">');
              $xcross2 = $('<div class = "xcross2">');
              $div.append($xcross1);
              $div.append($xcross2);
            }
          else if (this.board[j][i] === "o")
            {
              $o = $('<div class = "o">');
              $div.append($o);
            }
      if (this.board[j][i] == "")
          {
            //If hover and X is to play next then add X hover animation
            if (this.chooser[0]==="addX")
              {
              var $slash = ('<div class="slash slash-1"></div>');
              var $slash2 = ('<div class="slash slash-2"></div>');
              $div.append($slash);
              $div.append($slash2);
              }
            //Else if hover and O is to play next then add O hover animation
            else if (this.chooser[0]==="addO")
              {
              var $circleHover = ('<div class="circle"></div>');
              $div.append($circleHover);
              }
          }


        var that = this;
        $board.append($div);

        if (this.board[j][i] == "")
        {
          //Determine what box was clicked in the array and append an X or
          //O to the DOM
        $div.on("click", function () {
          var $el = $(this);
          var $gameDivs = $("#board > div");
          var myIndex = $gameDivs.index($el);
          var col = myIndex % game.boardSize;
          var row = Math.floor(myIndex / game.boardSize);
          that.xOrO
                  (
                    col,row
                  );

                  // ref.set({currentBoardSize: game.boardSize,
                  //         storedPlayerScore: game.playerScore,
                  //         storedComputerScore: game.computerScore,
                  //         storedBoard: game.board
                  //         });

                  that.renderBoard();
                  that.determineWinner();
                  that.checkIfBoardFull();
                  that.storeStuff();
        });
}

        $('.box').height("calc(100%/"+this.boardSize+")");
        $('.box').width("calc(100%/"+this.boardSize+")");
        }
    }

  },

  //Clears the DOM display

  clearBoardDisplay: function()
  {
    var $board = $('#board');
      $board.empty();
  },

  //Clear the array containing the board data

  clearBoardArray: function()
  {
for (var i = 0; i<this.board.length;i+=1)
{
  for (var j = 0; j <this.board.length; j+=1)
  {
    this.board[i][j]="";
  }
}
  },

  //Checks if boards is full and if so clears it

  checkIfBoardFull: function() {
  for (var i = 0; i<this.board.length;i+=1)
  {
    for (var j = 0; j  <this.board.length; j+=1)
    {
      if (this.board[j][i] === "")
      {
          return false;
      }
    }
  }

this.clearBoardArray();
this.renderBoard();

  },

  //Determine if there is a winner after each move
  determineWinner: function()
  {

var getColumn = function (ary, index) {
 return ary.map(function (row) {
   return row[index];
 });
};

    for (var i=0;i<this.board.length;i+=1) {


  var col = getColumn(game.board,i);
  var row = game.board[i];
//Check the verticals and horizontals
  this.checkArrayOfThree(col);
  this.checkArrayOfThree(row);
    }

    var primeDiag = function (ary) {
     return ary.map(function (row, rowIndex) {
       return row[rowIndex];
     });
    };

    var nonPrimeDiag = function (ary) {
 return ary.map(function (row, rowIndex) {
   return row[(row.length - 1) - rowIndex];
 });
};

var nPD = nonPrimeDiag(this.board);

var primeDiag = function (ary) {
 return ary.map(function (row, rowIndex) {
   return row[rowIndex];
 });
};

var pD = primeDiag(this.board);
//Check the diagonals
this.checkArrayOfThree(nPD);
this.checkArrayOfThree(pD);

/* Old array getter checker code

    var checkHor = [];
    var checkVer = [];
    var checkDia1 = [];
    var checkDia2 = [];

    for (var i = 0; i<game.board.length; i+=1)
      {
          checkHor = [];
          checkVer = [];
          checkDia1 = [];
          checkDia2 = [];

          for (var j = 0; j<game.board.length; j+=1)
          {
            checkHor.push(game.board[i][j]);
            checkVer.push(game.board[j][i]);

              if (checkDia1.length<game.board.length)
                {
                  checkDia1.push(game.board[j][j]);
                }

                if (checkDia2.length<game.board.length)
                  {
                    checkDia2.push(game.board[(game.board.length-j-1)][j]);
                  }

          }
          */


  },

//Check each row, colomn, diagonal to see if there is a winner
checkArrayOfThree: function(array)
{

  var won = true;
  var i = 1;
  while (i<array.length)
    {
        if (array[i] !== array[0] || array[i] === "")
        {
          won = false;
        }
        i += 1;
    }
  if (won === true)
  {
        if(array[0]==="x")
          {
            console.log("plusing");
          this.playerScore +=1;
          $('#playerScore').text(this.playerScore);
          if ($('#player1').val() !== "")
            {
          $('#winnerLog').text($('#player1').val() + " wins!");
            }
          else {$('#winnerLog').text("X wins!");}
          }
        if(array[0]==="o")
          {
          this.computerScore +=1;
          $('#computerScore').text(this.computerScore);
          if ($('#player2').val() !== "")
            {
          $('#winnerLog').text($('#player2').val() + " wins!");
            }
          else {$('#winnerLog').text("O wins!");}
          }

          this.clearBoardArray();

          this.renderBoard();

          setTimeout(function(){

        $('#winnerLog').text("Let's Play Tic-Tac-Toe!");

      }, 3000);

          return array[i];

    }
  },

//Choose whether to place an X or O depending on whose turn it is
  xOrO: function(x,y)
  {
    if (this.chooser[0] === "addX")
      {
        this.addX(x,y);
      }
    else if (this.chooser[0] === "addO")
      {
        this.addO(x,y);
      }
    this.chooser.unshift(this.chooser.pop());
  },
  addX: function(x,y)
  {
    this.board[x][y] = ("x");
  },
  addO: function(x,y)
  {
    this.board[x][y] = ("o");
  }

}

//Buttons
    $('#plus').on("click", function()
      {
      game.boardSize+=1;
      game.makeBoard();
      game.renderBoard();
      game.storeStuff();
    })

    $('#minus').on("click", function()
      {
      game.boardSize-=1;
      game.makeBoard();
      game.renderBoard();
      game.storeStuff();
    })

    $('#resetButton').on("click", function()
      {
      game.resetGame();
    })


    //Storing Player Name Data
    var $player1Input = $('#player1');
    var $currentInput1 = "";
    $player1Input.focusout(function(eventObject)
    {
    $currentInput = $(this).val();
    game.storeStuff();

    });

    var $player2Input = $('#player2');
    var $currentInput2 = "";
    $player2Input.focusout(function(eventObject)
    {
    $currentInput = $(this).val();
    game.storeStuff();
    });
