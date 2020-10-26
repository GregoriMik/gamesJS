// alert("to działa!");

const gameSumary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerSymbol: "",
    aiSymbol: "",
}

const symbols = [...document.querySelectorAll('.select img')];


//Pobieranie naszego wyboru
function symbolSelection() {
    // console.log(this)
    game.playerSymbol = this.dataset.option;
    console.log(game.playerSymbol);
    symbols.forEach(symbol => symbol.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow '
}
//Wybór komputera
function aiChoice() {
    const aiSymbol = symbols[Math.floor(Math.random() * 3)].dataset.option // losowy wybór symbolu
    // return 
    return aiSymbol;
}

const checkResult = function checkResult(player, aiSymbol, result) {
    if (player === aiSymbol) {
        console.log("remis");
        document.querySelector('[data-summary="who-win"]').classList.remove("red");
        document.querySelector('[data-summary="who-win"]').classList.add("yellow");
        document.querySelector('[data-summary="who-win"]').classList.remove("green");
        document.querySelector('[data-summary="who-win"]').classList.remove("red");
        document.querySelector('p.draws span').textContent = ++ gameSumary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis, nie jest źle, ale graj dalej!!";
    } else if ((player === "papier" && aiSymbol === "kamień") || (player === "kamień" && aiSymbol === "nożyczki") || (player === "nożyczki" && aiSymbol === "papier")) {
        console.log("wygrałeś")
        document.querySelector('[data-summary="who-win"]').textContent = "Wygrywasz ziomuś, oby tak dalej!";
        document.querySelector('[data-summary="who-win"]').classList.remove("red");
        document.querySelector('[data-summary="who-win"]').classList.remove("yellow");
        document.querySelector('[data-summary="who-win"]').classList.add("green");
        document.querySelector('p.wins span').textContent = ++ gameSumary.wins;

    } else {
        // console.log("przegrałeś");
        document.querySelector('[data-summary="who-win"]').textContent = "Przegrałeś!";
        // document.querySelector('[data-summary="who-win"]').addClass = "Red";
        document.querySelector('[data-summary="who-win"]').classList.remove("yellow");
        document.querySelector('[data-summary="who-win"]').classList.remove("green");
        document.querySelector('[data-summary="who-win"]').classList.add("red");
        document.querySelector('p.losses span').textContent = ++ gameSumary.losses;
        // console.log("przegrałeś")
    }
}






//Game result whowinner






//Publikacja wyniku
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="pc-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSumary.numbers;
    // console.log(result);
    // if (result === 'wins') {
    //     document.querySelector('p.wins span').textContent = ++ gameSumary.numbers;
    // }

    //<p>Wybór komputera: <span data-summary="pc-choice"></span></p>
    //<b><p>Zwycięzca gry: <span data-summary="who-win"></span></p></b>
}
//Funckja sterująca grą
function startGame() {
    if (!game.playerSymbol) {
        return alert("Musisz wybrać swój typ!");
    } else {
        // alert("kolejne działania");
        game.aiSymbol = aiChoice();
    }
    const gameResult = checkResult(game.playerSymbol, game.aiSymbol);
    publishResult(game.playerSymbol, game.aiSymbol, gameResult);
}

symbols.forEach(symbol => symbol.addEventListener('click', symbolSelection))


document.querySelector('.start').addEventListener('click', startGame);
