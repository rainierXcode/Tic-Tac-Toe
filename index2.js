const playButton = document.querySelector(".play-button-container")
const startingTitle = document.querySelector(".startingTitle")
const gameBox = document.querySelector(".game-box")
const grid = document.querySelectorAll(".gameboard-grid div")

function openGame(){
    startingTitle.style.display = "none"
    playButton.style.display = "none"
    gameBox.style.display = "flex"
}

playButton.addEventListener("click", openGame);
grid.forEach( box =>{
    box.addEventListener('click', ()=>{
        marker = box.querySelector("img")
        marker.src = "markers/o.svg"
    })
})

