##Initial Layout:
https://wireframe.cc/HkrVP1 also stored in the Tic Tac Toe Layout.png

##Technologies Used:
*HTML
*CSS
*Javascript
*JQuery
*PureCSS.io
*Framework
*Firebase

##Approach:
I approached the project by first creating the game board as a dynamic array that would be generated based off a given board size. By dynamically creating the array, it would be easy to scale. I.e. a larger board size would dynamically create a bigger board.

From there storing X's and O's is a matter of pushing X's and O's to the array and then rendering that array to the DOM using jQuery. When a box is clicked in the DOM, an X or O will be sent to the array ////// based on the position of where the box is located on the board. An X or O will then be display in the box clicked in the DOM.  

In order to check for a win condition, I made functions to check each row, column and diagonal on the board, the size of which is dependent on the board size.

After completing a playable game, I began storing the objects, board, board size, player names, etc. in Firebase. This allows the game to be stopped mid-game and then picked up in another session at another time  or on another computer as the board will render based off the objects stored in Firebase.

##Program Functions:
*Initaite Game: Automatically starts setups up the board, and starts the game.
*Reset Function: Automatically reset the game upon completion.
*Scoreboard: Tracks wins of each player.
*Game Options: Gives player the option to set the board (3x3, 4x4, etc.).
*Setup Board: Creates a board array based on a given board size.
*Render Board: Renders the current state of the board to the browser.
*Store Board: Stores all objects related to game in Firebase.
*Player Names: Allow the user to input player names and store them.
*Play: Upon clicking boxes on the board send alternating X's and O's to the respective location in the board array and display them in the DOM.
*Determine Winner: If there are a number of X's or O's in a row (horizontally, vertically, diagonally) equal to the board size end the game, determine the winner, update the scoreboard and log the winner to the display.
*Diplay: Display the winner in the display area.

##Technical Challenges:
Storing the game data on Firebase was the most challenging part of the project. The game is fully function but there are improvements that can be made as listed below.

##Improvements:
1. Players are not assigned either an X or an O. When playing against another player online, both players can take turns for the other player. I couldn't get Firebase to store a variable that determines when it has 1 player in the game and assign that player X and then next player that joins, O.
2. The X's are not perfectly centered in the boxes and it is noticeable when the board size increases.
3. A board size of 6 or greater causes the program to run slowly. A board size of 8 or greater brings the program to a crawl.
4. When using Firebase, each time an element is stored, the game calls the initiate function which isn't necessary. I haven't figured out why. I solved the issues it caused by moving some functions out of the initiation sequence but it's not ideal.
5. Firebase requires an update of every item stored on the server at the same time. For example, I couldn't get it to push only the score value to the server and not have the board, player names, etc. also pushed. All items must be pushed together at the same time or the ones not pushed are erased.
6. When the board is cleared the elements disappear immediately and it would be preferable if they faded out.
7. When a X or O is sent to the board it appears immediately and does fade-in or animate in.
8. The determine winner logic checks every row, column and diagonals after every click. Only the rows and columns that contained the box clicked (as well as the diagonals) need to be checked each time.
9. Add a computer to play as the opponent and toggle off/on the second player.
