$(document).ready(function () {
  var population = 1000;
  var births = 1;
  var birthRate;
  var deaths;
  var foodPopIncr = 1;

  var = gameSpeed = 1000;

  DeathRateCalc();
  DisplayStats();
  EarthClick();
  FoodButton();


  setInterval(function (){
    GameOver();
    Birth();
    Death();
  }, gameSpeed);

  

  function DeathRateCalc () {
    deaths = population / 100 * 5 + 1;
  }

  function DisplayStats() {
    $(".population").html(Math.floor(population));
    $(".birth-rate").html(Math.floor(births));
    $(".death-rate").html(Math.floor(deaths));
    $("span.food-pop-incr").html(Math.floor(foodPopIncr));
  }

  function Clicker () {
    population++;
    Math.floorDisplayStats();
  }

  function Birth () {
    population += births;
    DisplayStats()
  }

  function Death () {
    DeathRateCalc();
    population -= deaths;
    DisplayStats;
  }

  function GameOver () {
    if (population <= 0) {
      alert("Catastrophe! There's no humans left!");
    }
  }

  function EarthClick () {
    $(".earth").click(function (event) {
      Clicker();
    });
  }

  function FoodButton () {
    $("button.food-pop-incr").click(function (event) {
      births += foodPopIncr;
      console.log("Plus Food");
      DisplayStats();
    });
  }


});
