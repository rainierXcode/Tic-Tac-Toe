function hideBgMarkers() {
    const bgMarkers = document.querySelectorAll(".bgMark");
    bgMarkers.forEach(mark => {
        mark.style.display = "none"
    })
}



const game = (function () {

    let gameboardArray = ["", "", "", "", "", "", "", "", ""]

    let round = 1;

    let winningPossibilities =
        [
            //row
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            //col
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            //slant
            [0, 4, 8],
            [2, 4, 6]
        ]

    function updateBox(currentPlayer) {
        const thisBox = this.querySelector("img");
        thisBox.style.opacity = 1;
        thisBox.src = "../markers/mark" + currentPlayer.marker + ".svg";
        const gridNum = parseInt(thisBox.getAttribute("data-num"))
        this.classList.add("unclickable")
        gameboardArray[gridNum - 1] = currentPlayer.marker;
    }

    function reset() {
        const boxGrid = document.querySelectorAll(".gameboard-grid div");
        round+=1;
        boxGrid.forEach(box => {
            box.classList.remove("unclickable")
            boxImg = box.querySelector("img")
            boxImg.src = ""
        })
        gameboardArray = gameboardArray.map(() => "");

    }

    function cantClickBoxNow(){
        const boxGrid = document.querySelectorAll(".gameboard-grid div");
        boxGrid.forEach(box =>{
            box.classList.add("unclickable");
        })
    }

    function checkWinner() {
        for (let i = 0; i < winningPossibilities.length; i++) {
            option = winningPossibilities[i];
            firstGrid = option[0];
            secondGrid = option[1];
            thirdGrid = option[2]
            if (gameboardArray[firstGrid] == "" || gameboardArray[secondGrid] == "" || gameboardArray[thirdGrid] == "") {
                continue;
            }

            if (gameboardArray[firstGrid] === gameboardArray[secondGrid] && gameboardArray[secondGrid] === gameboardArray[thirdGrid]) {
                return gameboardArray[firstGrid]
            }
        }

        if (!gameboardArray.includes("")) {
            return "Draw"
        }

        return "Playing"
    }

    function changePlayer(currentPlayer, p1, p2) {
        return (currentPlayer == p1) ? p2 : p1;
    }

    function statusUpdate(status) {
        const p1Turn = document.getElementById("p1-turn");
        const p2Turn = document.getElementById("p2-turn");

        switch (status) {
            case "X":
                p1Turn.textContent = "Your Turn";
                p2Turn.textContent = "";
                return;
            case "O":
                p2Turn.textContent = "Your Turn";
                p1Turn.textContent = "";
                return;
            default:
                p1Turn.textContent = "";
                p2Turn.textContent = "";
        }
    }

    function handleGameResult(result, p1, p2) {
        const statusName = document.getElementById("status")
        switch (result) {
            case p1.marker:
                statusName.textContent = p1.name + " Win!";
                break;
            case p2.marker:
                statusName.textContent = p2.name + " Win!";
                statusUpdate(p2.name + " Win!")
                break;
            case "Draw":
                statusName.textContent = "Draw";
                break;
            default:
                statusUpdate(currentPlayer.marker)
                return;
        }

        cantClickBoxNow()
        statusUpdate("None");
        setTimeout(()=>{
            reset();
            statusName.textContent = "Round " + round;
            statusUpdate(currentPlayer.marker)
        }, 3000)
    }

    function playGame(p1, p2) {

        const boxGrid = document.querySelectorAll(".gameboard-grid div");
        currentPlayer = p1;
        statusUpdate(currentPlayer.name + " Turn")

        boxGrid.forEach(box => {
            box.addEventListener('click', function () {
                updateBox.call(this, currentPlayer);
                result = checkWinner()
                currentPlayer = changePlayer(currentPlayer, p1, p2);
                handleGameResult(result, p1, p2)
            });

            box.addEventListener("mouseenter", () => {
                const boxImg = box.querySelector("img");
                boxImg.src = "../markers/mark" + currentPlayer.marker + ".svg";
                boxImg.classList.add("fadeIn");
                boxImg.style.opacity = 0.35;
            })

            box.addEventListener("mouseleave", () => {
                const computedStyle = window.getComputedStyle(box);

                const pointerEventsValue = computedStyle.getPropertyValue('pointer-events');

                if (pointerEventsValue !== 'none') {
                     const boxImg = box.querySelector("img");
                     boxImg.src = "";
                }
            })


        })





    }

    return {
        playGame: (p1, p2) => playGame(p1, p2)
    };

})();



function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}


function openGame() {
    const player1 = new Player("Player 1", "X")
    const player2 = new Player("Player 2", "O")

    hideBgMarkers();

    const startingTitle = document.querySelector(".startingTitle")
    const gameBox = document.querySelector(".game-box")

    startingTitle.style.display = "none"
    playButton.style.display = "none"
    gameBox.style.display = "flex"
    game.playGame(player1, player2)
}



const playButton = document.querySelector(".play-button-container")
playButton.addEventListener("click", openGame);


