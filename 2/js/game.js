//alert('to działa!');
const cardsColor = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "brown",
  "brown",
  "yellow",
  "yellow",
  "gray",
  "gray",
  "cadetblue",
  "cadetblue",
  "violet",
  "violet",
  "lightgreen",
  "lightgreen",
];

let cards = document.querySelectorAll("div");
//zamiana nodelist na tablice
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];
let counter = 0;

const gamePairs = cards.length / 2; //liczba par
let gameResult = 0; //do ustalenia kiedy gra się zakończy

const clickCard = function () {
  counter = +counter + 1;
  console.log(counter);
  activeCard = this; //co zostało kliknięte
  activeCard.classList.remove("hidden"); //usuwanie klasy dodanej przy losowaniu

  //czy to 1 kliknięcie
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;

    //czy to 2 kliknięcie
  } else {
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    activeCards[1] = activeCard;
    setTimeout(function () {
      if (activeCards[0].className === activeCards[1].className) {
        console.log("wygrana");
        activeCards.forEach((card) => card.classList.add("off"));
        gameResult++;
        if (gameResult == gamePairs) {
          const endTime = new Date().getTime(); // odejmowanie czasu do stopera
          const gameTime = endTime - startTime;
          alert(
            `Udało się! Twój wynik to: ${
              gameTime / 1000
            } sekund i ${counter} kliknięć.Tą gre można wygrać w 36 kliknięciach, sam sobie odpowiedz, czy to dobry wynik :)`
          ); // Prezentowanie wyniku gry w alercie
          location.reload();
        }
      } else {
        console.log("przegrana");
        activeCards.forEach((card) => card.classList.add("hidden"));
      }
      activeCard = "";
      activeCards.length = 0;
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 500);
  }
};

//Iteracja na każdym elemencie tablicy
const init = function () {
  cards.forEach(function (card) {
    const position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position]);

    //metoda splice usuwa konkretny element z tablicy
    cardsColor.splice(position, 1);
  });
  setTimeout(function () {
    cards.forEach(function (card) {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 1500);
};
init();
