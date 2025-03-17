document.addEventListener("DOMContentLoaded", function(){
    console.log("I am listening to this page")


    const tiles = document.querySelectorAll('.tile')
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart')

    let gameActive = true
    let currentPlayer = 'X'
    let gameState = ['', '', '', '', '', '', '', '', '']

    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6]  // diagonal top-right to bottom-left
            
    ]

    // Messages
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

    //set initial status message
    statusDisplay.textContent=currentPlayerTurn()

    //handle tile click
    function handleCellClick(event){
        const clickedTile = event.target
        const clickedCellIndex = parseInt(clickedTile.getAttribute('data-cell-index'))


        //check if cell is already or game is paused
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update game state
        gameState[clickedCellIndex] = currentPlayer;
        clickedTile.textContent = currentPlayer;
        clickedTile.classList.add(currentPlayer.toLowerCase());

        //check if the current player won
        checkWin()

        //check if it's are draw
        checkDraw()

        //change player if game is still active

        if(gameActive){
            changePlayer()
        }

    }
    function checkWin() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                // Highlight winning cells
                tiles[a].classList.add('win');
                tiles[b].classList.add('win');
                tiles[c].classList.add('win');
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = winningMessage();
            gameActive = false;
            return;
        }
    }

    function checkDraw() {
        if (!gameState.includes('') && gameActive) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
        }
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        statusDisplay.textContent = currentPlayerTurn()
    }
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = currentPlayerTurn();
        
        tiles.forEach(tile => {
            tile.textContent = '';
            tile.classList.remove('x', 'o', 'win');
        });
    }
        

        // Event listeners
        tiles.forEach(tile => {
            tile.addEventListener('click', handleCellClick);
        });
        
        restartButton.addEventListener('click', restartGame);
        
    
    
















})




// function randomValue(){
//     let newValue ;

//     return newValue = Math.round(Math.random())
    
// }

// tiles.forEach(tile => {
//     tile.addEventListener("click", function(event){
//         let value = randomValue();
//         // Use this specific tile that was clicked
//         if(value === 1){

//             this.innerText = value;

//         }
//         else if(value === 0){
//             this.innerText = "X"
//         }

        
//     });
    




// })

