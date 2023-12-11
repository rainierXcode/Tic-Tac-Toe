const game = ( function (){

    let gameboardArray = [[" "," "," "], [" "," "," "], [" "," "," "]]
    
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
    
    const haveWinner = ({player1Name, player1Marker}, {player2Name, player2Marker}) => {
    
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
              case "X":
                console.log(player1Name + " Win")
                break;
              case player2Marker:
                console.log(player2Name + " Win")
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
    
    const playGame = (p1, p2) => {
        let choice = ""
        while(true){
    
           
           console.log(p1.name + " turn");
           const prompt = require('prompt-sync')();
           choice = prompt("Choice: ")
           inputChoice(p1, choice)
    
           if(haveWinner(p1,p2)){
             break;
           }
    
           console.log(p2.name + " turn");
           choice = prompt("Choice: ")
           inputChoice(p2, choice)
    
           if(haveWinner(p1,p2)){
             break;
           }
        }
       
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
    
    
    const player1 = new Player("Rainier", "X")
    const player2 = new Player("David", "O")
    
    game.gameboard();
    game.playGame(player1, player2)
    
    
    