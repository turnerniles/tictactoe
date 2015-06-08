var ref = new Firebase('https://nttictactoe.firebaseio.com/');

$(document).ready(function () {

  // var $player1Input = $('#player1'); //These are defined at the bottom in the input focusout code.
  // var $player2Input = $('#player2');

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
  initiate: function()
  {
    console.log("initiate");
    this.renderBoard();

    $('#playerScore').text(game.playerScore);
    $('#computerScore').text(game.computerScore);

  },

  resetGame: function()
  {
  this.boardSize = 3;
  this.playerScore = 0;
  this.computerScore = 0;
  $player1Input.val("");
  $player2Input.val("");
  game.clearBoardArray();
  game.renderBoard();
  game.storeStuff();

  },
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
  renderBoard: function()
  {
    this.clearBoardDisplay();
    var $board = $('#board');

    for(var i = 0; i < this.boardSize; i+=1)
    {
      for(var j = 0; j < this.boardSize; j+=1)
      {

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
  clearBoardDisplay: function()
  {
    var $board = $('#board');
      $board.empty();
  },
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

  this.checkArrayOfThree(col);
  this.checkArrayOfThree(row);
    }

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

var pD = nonPrimeDiag(this.board);

// check the verticals
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
          this.playerScore +=1;
          $('#playerScore').text(this.playerScore);
          }
        if(array[0]==="o")
          {
          this.computerScore +=1;
          $('#computerScore').text(this.computerScore);
          }

          this.clearBoardArray();

          this.renderBoard();

          return array[i];
    }
  },


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
    console.log($player1Input);
    var $currentInput1 = "";
    $player1Input.focusout(function(eventObject)
    {
    $currentInput = $(this).val();
    game.storeStuff();
    console.log($currentInput2);

    });

    var $player2Input = $('#player2');
    console.log($player1Input);
    var $currentInput2 = "";
    $player2Input.focusout(function(eventObject)
    {
    $currentInput = $(this).val();
    game.storeStuff();
    console.log($currentInput2);
    });
