$(document).ready(function () {
  game.initiate();
})

// $('.box').on(click, function () {
//   var $el = $(this);
//   var $gameDivs = $("#board > div");
//   var myIndex = $gameDivs.index($el);
//   var col = myIndex % game.boardSize;
//   var row = Math.floor(myIndex / game.boardSize);
// });

var game =
{
  initiate: function()
  {
    this.makeBoard();
    this.renderBoard();

    $('#plus').on("click", function()
      {
      game.boardSize+=1;
      this.makeBoard();
      this.renderBoard();
    }.bind(this))

    $('#minus').on("click", function()
      {
      game.boardSize-=1;
      this.makeBoard();
      this.renderBoard();
    }.bind(this))

  },
  reset: function()
  {

  },
  updateScore: function()
  {

  },
  gameOptions: function()
  {

  },

  boardSize: 3,
  board: [],
  playerScore: 0,
  computerScore: 0,
  chooser: ["addX", "addO"],
  makeBoard: function()
  {
    this.board = [];
    for (var i = 0; i<this.boardSize;i+=1)
      {
        var row = [];
            for (var j = 0; j<this.boardSize; j+=1)
              {
                row.push(null);
              }
        this.board.push(row);
      };
  },
  renderBoard: function()
  {
    this.clearBoardDisplay();
    var $board = $('#board');

    for(var i = 0; i < this.board.length; i+=1)
    {
      for(var j = 0; j < this.board[0].length; j+=1)
      {

        var $div = $('<div class = "box X'+j+' Y'+i+' ambient">');
          if (this.board[j][i] === "x")
            {
              $x = $('<div class = "x">');
              $div.append($x);
            }
          else if (this.board[j][i] === "o")
            {
              $o = $('<div class = "o">');
              $div.append($o);
            }

            $slash = ('<div class="slash slash-1"></div>')
            $slash2 = ('<div class="slash slash-2"></div>')
            $div.append($slash);
            $div.append($slash2);

        var that = this;
        $div.on("click", function()
          {
            that.xOrO
            (
              $(this).attr('class').split(' ')[1],
              $(this).attr('class').split(' ')[2]
            );
            that.renderBoard();
            that.determineWinner();
          })

        $board.append($div);

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
    this.board[i][j]=null;
  }
}
  },
  determineWinner: function()
  {

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

          // Check the horizontals. Can refactored into a function
          this.checkArrayOfThree(checkHor);

            // Check the verticals
          this.checkArrayOfThree(checkVer);
      }
          this.checkArrayOfThree(checkDia1);
          this.checkArrayOfThree(checkDia2);
  },

checkArrayOfThree: function(array)
{
  var won = true;
  var i = 1;
  while (i<array.length)
    {
        if (array[i] !== array[0] || array[i] === null)
        {
          won = false;
        }
        i += 1;
    }
  if (won === true)
  {
    console.log(array[0]);
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
    var x = parseInt(x.split('')[1]);
    var y = parseInt(y.split('')[1]);
    this.board[x][y] = ("x");
  },
  addO: function(x,y)
  {
    var x = parseInt(x.split('')[1]);
    var y = parseInt(y.split('')[1]);
    this.board[x][y] = ("o");
  }

}
