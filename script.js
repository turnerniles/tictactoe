$(document).ready(function () {
  game.initiate();
})


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
    this.clearBoard();
    var $board = $('#board');

    for(var i = 0; i < this.board.length; i+=1)
    {
      for(var j = 0; j < this.board[0].length; j+=1)
      {

        var $div = $('<div class = "box X'+j+' Y'+i+'">');

          if (this.board[j][i] === "o")
            {
              $div.text('o');
            }
          else if (this.board[j][i] === "x")
            {
                $div.text('x');
            }

            var that = this;
        $div.on("click", function()
          {
            that.xOrO
            (
              $(this).attr('class').split(' ')[1],
              $(this).attr('class').split(' ')[2]
            );
            that.renderBoard();
          })

        $board.append($div);

        $('.box').height("calc(100%/"+this.boardSize+")");
        $('.box').width("calc(100%/"+this.boardSize+")");
      }
    }

  },
  clearBoard: function()
  {
    var $board = $('#board');
    $board.empty();
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
