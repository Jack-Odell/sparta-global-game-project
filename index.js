$(document).ready(function () {
  var population = 1000;
  var birthRate = 1;
  var deathRate = 2;

  DisplayStats();
  setInterval(function (){
    GameOver();
    Birth();
    Death();
  }, 1000);


  function DisplayStats() {
    $(".population").html(population);
    $(".birth-rate").html(birthRate);
    $(".death-rate").html(deathRate);
  }

  function Clicker() {
    population++;
    DisplayStats();
  }

  function Birth() {
    population += birthRate;
    DisplayStats()
  }

  function Death () {
    population -= deathRate;
    DisplayStats;
  }

  function GameOver() {
    if (population <= 0) {
      alert("Catastrophe! There's no humans left!");
    }
  }

  $(".earth").click(function () {
    Clicker();
  });
});
