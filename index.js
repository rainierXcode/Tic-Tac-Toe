const game = ( function (){

    let gameboardArray = [[" "," "," "], [" "," "," "], [" "," "," "]]
    let round = 1
    
    const allpossibilities = [
      // Rows
      [ [0, 0], [0, 1], [0, 2] ],
      [ [1, 0], [1, 1], [1, 2] ],
      [ [2, 0], [2, 1], [2, 2] ],
    
      // Columns
      [ [0, 0], [1, 0], [2, 0] ],
      [ [0, 1], [1, 1], [2, 1] ],
      [ [0, 2], [1, 2], [2, 2] ],
    
      // Diagonals
      [ [0, 0], [1, 1], [2, 2] ],
      [ [0, 2], [1, 1], [2, 0] ],
    ];
    
    
    
    const gameboard = () =>{
    console.log("------------")
    console.log("| " + gameboardArray[0][0] + " | " + gameboardArray[0][1] + " | " + gameboardArray[0][2] + " |")
    console.log("| " + gameboardArray[1][0] + " | " + gameboardArray[1][1] +  " | " + gameboardArray[1][2] + " |")
    console.log("| " + gameboardArray[2][0] + " | " + gameboardArray[2][1] +  " | " + gameboardArray[2][2] + " |")
    console.log("------------")
    }
    
    const haveWinner = (p1,p2) => {
    
      let isFull = true;
      
      for (let row = 0; row < allpossibilities.length; row++) {
        let [
            [firstRow, firstCol],
            [secondRow, secondCol],
            [thirdRow, thirdCol]
        ] = allpossibilities[row];
    
        if(
          gameboardArray[firstRow][firstCol] == " " || gameboardArray[secondRow][secondCol] == " " || gameboardArray[thirdRow][thirdCol] == " "
        ){
          isFull = false;
        }
    
        else if (
            gameboardArray[firstRow][firstCol] === gameboardArray[secondRow][secondCol] &&
            gameboardArray[firstRow][firstCol] != " " && gameboardArray[secondRow][secondCol] != " " &&
            gameboardArray[secondRow][secondCol] === gameboardArray[thirdRow][thirdCol] &&
            gameboardArray[thirdRow][thirdCol] != " "
        ) {
            let winner = gameboardArray[firstRow][firstCol];
    
            switch(winner){
              case p1.marker:
                console.log(p1.name + " Win")
                break;
              case p2.marker:
                console.log(p2.name + " Win")
                break;
            }
            return true;
        }
    }
    
        if(isFull){
          console.log("Draw!!")
          return true;
        }
         return false
    }
    
    const inputChoice = (player, choice) =>{
    
      switch(choice){
        case "1":
          gameboardArray[0][0] = player.marker;
          break;
        case "2":
          gameboardArray[0][1] = player.marker;
          break;
        case "3":
          gameboardArray[0][2] = player.marker;
          break;
        case "4":
          gameboardArray[1][0] = player.marker;
          break;
        case "5":
          gameboardArray[1][1] = player.marker;
          break;
        case "6":
          gameboardArray[1][2] = player.marker;
          break;
        case "7":
          gameboardArray[2][0] = player.marker;
          break;
        case "8":
          gameboardArray[2][1] = player.marker;
          break;
        case "9":
          gameboardArray[2][2] = player.marker;
          break;
          
        
      }
      gameboard();
    }

    const nextRound = () =>{
      for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
          gameboardArray[row][col] = " "
        }
      }
      grid.forEach(box =>{
        marker = box.querySelector("img")
        marker.src = " "
        box.classList.remove("unclickable")
      })
      const roundLevel = document.getElementById("roundLevel")
      round+=1;
      roundLevel.textContent = "Round " + round;
    }
    
    const playGame = (p1, p2) => {
        let choice = ""
        
        //first to put mark per round
        switch(round % 2){
          case 1:
            currentToPlay = p1;
            break;
          case 2:
            currentToPlay = p2;
        }

        grid.forEach( box =>{
          box.addEventListener('click', ()=>{
              marker = box.querySelector("img")

              switch(currentToPlay){
                case p1:
                  marker.src = "markers/" + p1.marker +".svg"
                  choice = marker.getAttribute('data-num')
                  inputChoice(p1, choice)
                  box.classList.add("unclickable");
                  if(haveWinner(p1,p2)){
                    nextRound()
                  }
                  currentToPlay = p2;
                  break;
                case p2:
                  marker.src = "markers/" + p2.marker +".svg"
                  choice = marker.getAttribute('data-num')
                  inputChoice(p2, choice)
                  box.classList.add("unclickable");
                  if(haveWinner(p1,p2)){
                    nextRound()
                  }
                  currentToPlay = p1;
                  break;
              }
              
          })
      })
       
    }
    
    return  {
       gameboard: () => gameboard(),
       playGame: (p1, p2) => playGame(p1, p2)
    };
    
    })();
    
    
    
    function Player(name, marker){
       this.name = name;
       this.marker = marker;
    }
    
    
    const player1 = new Player("Player 1", "X")
    const player2 = new Player("Player 2", "O")
    
   


const playButton = document.querySelector(".play-button-container")
const startingTitle = document.querySelector(".startingTitle")
const gameBox = document.querySelector(".game-box")
const grid = document.querySelectorAll(".gameboard-grid div")


 
  
  

function openGame(){
    startingTitle.style.display = "none"
    playButton.style.display = "none"
    gameBox.style.display = "flex"
    game.gameboard();
    game.playGame(player1, player2)
}

playButton.addEventListener("click", openGame);




    
    
    