Layout: https://wireframe.cc/HkrVP1

Technologies Used: HTML, CSS, Javascript, JQuery, PureCSS.io Framework, Firebase

Approach: I approached the project by first creating the game board as a dynamic array that would be generated based off a given board size. By dynamically creating the array, it would be easy to scale. I.e. a larger board size would dynamically create a bigger board. From there storing X's and O's is a matter of pushing X's and O's to the array and then rendering that array to the DOM using jQuery. When a box is clicked in the DOM, an X or O will be sent to the array based on the position of where the box is in the board. An X or O will then be display in the box clicked in the DOM.  In order to check for a win condition, I made rules to check each row, column and diagonal or the board, the size of which is dependent on the board size. After completing a playable game, I began storing the objects, board, board size, player names etc. on firebase. This allows the game to be stopped mid-game and then picked up in another session at another time on another computer as the board will render based off the objects stored on the Firebase server.

Program Functions:
-Initaite Game: Automatically starts setups up the board, and starts the game.
-Reset Function: Automatically reset the game upon completion.
-Scoreboard: Tracks wins of each player.
-Game Options: Gives player the option to set the board (3x3, 4x4).
-Setup Board: Creates a board array given the size of the board.
-Render Board: Renders the current state of the board to the browser.
-Store Board: Stores all objects related to game on firebase.
-Play: Upon clicking the board send alternating X's and O's to the board array.
-Determine Winner: If there are X's or O's in a row (horizontally, vertically, diagonal) equal to the board size end the game, determine the winner and update the scoreboard.

Technical Challenges: Storing the game data on firebase was the most challenging part of the project. The game is fully function but there are improvements that can be made as listed below.

Improvements:
1. Players are not assigned either an x or an o. So when playing against another player online both players could take turns for the other player. I couldn't get firebase to store a variable that determines when it has a player in the game and assign that player either x or o to play with.
2. The X's are not perfectly centered in the boxes and it is noticeable when the board size increases.
3. A board size of 6 or great causes the program to run slowly. A board size of 8 or greater brings the program to a crawl.
4. When using firebase, each time an element is stored, the game calls the initiate function which isn't necessary. I haven't figured out why. I solved the issues it caused by moving some functions out of the initiation sequence but it's not ideal.
5. Firebase requires an update of every item stored on the server at the same time. For example, I couldn't get it to only update the score and not have the board, player names, etc. also stored. All items must be updated at the same time or the others are erased.
6. When the board is cleared the elements disappear immediately and it would be preferable if they faded out.
7. When a X or O is sent to the board it appears immediately and does fade-in or animate in.
