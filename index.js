const game = ( function (){

  let gameboardArray = ["", "", "", "", "", "", "", "", ""]

  let winningPossibilities =
  [
      //row
      [0,1,2],
      [3,4,5],
      [6,7,8],

      //col
      [0,3,6],
      [1,4,7],
      [2,5,8],

      //slant
      [0,4,8],
      [2,4,6]
  ]

  function updateBox(currentPlayer) {
      const thisBox = this.querySelector("img");
      thisBox.src = "./markers/mark" + currentPlayer.marker + ".svg";
      const gridNum = parseInt(thisBox.getAttribute("data-num"))
      this.classList.add("unclickable")
      gameboardArray[ gridNum -1 ] = currentPlayer.marker;
  }
  
  function reset(){
      const boxGrid = document.querySelectorAll(".gameboard-grid div");
      boxGrid.forEach(box =>{
          box.classList.remove("unclickable")
          boxImg = box.querySelector("img")
          boxImg.src = ""
      })
      gameboardArray = gameboardArray.map(() => "");

  }

  function checkWinner(){
      for(let i = 0; i < winningPossibilities.length; i++){
          option = winningPossibilities[i];
          firstGrid = option[0];
          secondGrid = option[1];
          thirdGrid = option[2]
          if(gameboardArray[firstGrid] == "" || gameboardArray[secondGrid] == "" || gameboardArray[thirdGrid] == ""){
              continue;
          }
          
          if( gameboardArray[firstGrid] === gameboardArray[secondGrid] && gameboardArray[secondGrid] === gameboardArray[thirdGrid]){
              console.log("win")
              return gameboardArray[firstGrid]
          }
      }
      
      if(!gameboardArray.includes("")){
          return "Draw"
      }

      return "Playing"
  }

  function changePlayer(currentPlayer,p1,p2){
      return (currentPlayer == p1) ? p2 : p1;
  }

  function statusUpdate(status){
      const statusName = document.getElementById("status")
      statusName.textContent =  status
  }

  function handleGameResult(result,p1,p2){
      switch(result){
          case p1.marker:
              statusUpdate(p1.name + " Win!")
              break;
          case p2.marker:
              statusUpdate(p2.name + " Win!")
              break;
          case "Draw":
              statusUpdate("Draw")
              break;
          default:
              statusUpdate(currentPlayer.name + " Turn")
              return; 
      }
      reset()
  }
  
  function playGame(p1,p2) {
      const boxGrid = document.querySelectorAll(".gameboard-grid div");
      currentPlayer = p1;
      statusUpdate(currentPlayer.name + " Turn")

      boxGrid.forEach(box =>{
          box.addEventListener('click', function() {
              updateBox.call(this, currentPlayer);
              result = checkWinner()
              currentPlayer = changePlayer(currentPlayer,p1,p2);
              handleGameResult(result,p1,p2)
      
              
          });
          
      })
  }

  return  {
     playGame: (p1, p2) => playGame(p1, p2)
  };
  
  })();
  
  
  
function Player(name, marker){
  this.name = name;
  this.marker = marker;
}
  

function openGame(){
  const player1 = new Player("Player 1", "X")
  const player2 = new Player("Player 2", "O")
      
  const startingTitle = document.querySelector(".startingTitle")
  const gameBox = document.querySelector(".game-box")

  startingTitle.style.display = "none"
  playButton.style.display = "none"
  gameBox.style.display = "flex"
  game.playGame(player1, player2)
}


const playButton = document.querySelector(".play-button-container")
playButton.addEventListener("click", openGame);




  
  
  
