$(document).ready(function () {
  var population = 100;
  var maxPopulation = 1000000000;
  var births = 1;
  var deaths = 0;
  var foodPopIncr = 1;

  var foodRequirement = 0;
  var foodTotal = 1;
  var foodCost = 100;
  var foodLevel = 1;
  var foodMod = 1;
  var clickIncr = 10;

  var workerLevel = 0;
  var workerCost = 1000;
  var workerIncr = 1;
  var clickWorker = 0;

  var techCCMod = 1;
  var techTotal = 0;
  var techLevel = 1;
  var techCost = 100;

  var canBuyFood;
  var canBuyTech;
  var CanBuyWorker;

  var daySpeed = 1000;
  var monthSpeed = 5000;

  var progressPercent;
  var monthPercent = 0;

  var gamePlaying = false;

  StartGame();
  GameManager();
  DisplayStats();
  EarthClick(techCCMod);
  FoodButton();
  TechButton();
  WorkerButton();
  Restart();

// Functions to repeat according to daySpeed and month
  function StartGame () {
    $(".start-game").css("display", "absolute")
    $(".main-game-window").toggle();
    $(".win-screen").css("display", "none");
    $(".lose-screen").css("display", "none");

    $(".start-button").click(function (event) {
      gamePlaying = true;
      $(".main-game-window").css("display", "relative");
      GameManager();
      console.log(gamePlaying);
    });
  }


  function GameManager() {
    if (gamePlaying) {
    $(".music").trigger("play").prop("volume", 0.1);
    $(".main-game-window").toggle();
    $(".win-screen").css("display", "none");
    $(".lose-screen").css("display", "none");
    $(".start-game").css("display", "none")
      setInterval(function () {
        FoodFarm();
      }, monthSpeed);

      setInterval(function (){
          DisplayStats();
          DeathRateCalc();
          GameOver();
          FoodReq();
          ClickWorker();
          Birth();
          Death();
          Progress();
          MonthCounter();
          WinGame();
        }, daySpeed);
    } else if (population === maxPopulation){
      population = maxPopulation;
      gamePlaying = false;
    }
  }

//This function displays all stats available on the page
  function DisplayStats() {
    function TheStat(theClass, theVar) {
      $(theClass).html(Math.floor(theVar).toLocaleString());
    }

    TheStat(".population", population);
    TheStat(".max-population", maxPopulation);
    TheStat(".birth-rate", births);
    TheStat(".death-rate", deaths);
    TheStat(".food-cost", foodCost);
    TheStat(".food-stat", foodTotal);
    TheStat(".food-req", foodRequirement);
    TheStat(".food-lvl", foodLevel);
    TheStat(".worker-stat", workerLevel);
    TheStat(".worker-cost", workerCost);
    TheStat(".tech-cost", techCost);
    TheStat(".tech-lvl", techLevel);
    TheStat(".tech-stat", techTotal);
  }

//Calculation for the death rate. Death rate is a percentage of the population
  function DeathRateCalc () {
    if (foodTotal < foodRequirement / 3) {
      $(".food-req").css("color", "red");
      deaths = (population / 100) * 50 + 1;
    }
    else if (foodTotal < foodRequirement / 2) {
      $(".food-req").css("color", "orange");
      deaths = (population / 100) * 40 + 1;
    }
    else if (foodTotal > foodRequirement) {
      $(".food-req").css("color", "green");
      deaths = (population / 100) * 5 + 1;
    }
  }

//Amount for Birth Rate
  function Birth () {
    var popIncr = births - deaths;
    population += births;
    PlusIndicator(".pop-plus-indicator", popIncr);
    DisplayStats();
    if (popIncr > 0) {
      $(".get-pop").trigger("play");
    }
  }

//Takes a number variable and shows it the given class
  function PlusIndicator (theClass, theVar) {
      if (theVar > 0) {
        $(theClass).html("+" + (Math.floor(theVar).toLocaleString())).stop(true, true).slideToggle(50).fadeOut(600);
    }
  }

//Amount for Death Rate
  function Death () {
    population -= deaths;
    DisplayStats();
  }

//Adds a mulitplication of food total to birth rate
  function FoodFarm () {
    foodTotal += (foodLevel * foodLevel * foodLevel * foodLevel) * foodMod;
    births += foodTotal;
  }

//The threshold before birth rate is increased
  function FoodReq() {
    foodRequirement = (population / 100) + 1;
    return foodRequirement;
  }

//A check to see if player has enough points to buy food
  function FoodCostCheck () {
    if (population >= foodCost) {
      $("button.food-pop-incr").css("box-shadow", "0 0px 40px rgba(145, 92, 182, .4)")
      canBuyFood = true;
    } else {
      canBuyFood = false;
    }
  }

//Button to upgrade monthly food output
  function FoodButton () {
    $("button.food-pop-incr").click(function (event) {
      FoodCostCheck();
      if (canBuyFood) {
        $(".get-select").trigger("play");
        foodLevel++
        foodMod++;
        population -= foodCost;
        foodCost *= 3.5;
        DisplayStats();
      }
    });
  }

  function TechCostCheck () {
    if (population >= techCost) {
      canBuyTech = true;
    } else {
      canBuyTech = false;
    }
  }

  //Button to upgrade clicker value
  function TechButton () {
    $("button.tech-incr").click(function (event) {
    TechCostCheck();
    if (canBuyTech) {
      $(".get-select").trigger("play");
      techCCMod *= 1.5;
      clickIncr *= techCCMod;
      population -= techCost;
      techCost *= 3.5;
      techLevel++;
      DisplayStats();
      }
    });
  }

  function WorkerCostCheck () {
    if (population >= workerCost) {
      canBuyWorker = true;
    } else {
      canBuyWorker = false;
    }
  }

  function WorkerButton () {
    $("button.worker-incr").click(function (event) {
      WorkerCostCheck();
    if (canBuyWorker) {
      $(".get-select").trigger("play");
      workerLevel++;
      clickWorker++;
      population -= workerCost;
      workerCost = workerCost * 5;
      DisplayStats();
      }
    });
  }

  function ClickWorker () {
    if (workerLevel > 0) {
      var workIncr = clickIncr * workerLevel;
      population += workIncr;
      PlusIndicator(".worker-indicator", workIncr);
    }
  }

  function EarthClick () {
    $(".earth").click(function (event) {
      PlusIndicator(".earth-indicator", clickIncr);
      population += clickIncr;
      DisplayStats();
    });
  }

//Progress Bar
  function Progress() {
    progressPercent = population / maxPopulation * 100;
    if (progressPercent < 100) {
    $("#bar").width(progressPercent + "%");
    }
    else if (progressPercent > 100) {
      progressPercent = 100;
      $("#bar").width(progressPercent + "%");
    }
  }

  function MonthCounter() {
    monthPercent += 25;
    if (monthPercent <= 100) {
    $("#month-bar").width(monthPercent + "%");
    }
    else if (monthPercent > 100) {
      monthPercent = 0;
      $("#month-bar").width(monthPercent + "%");
    }
  }

  function Restart () {
    $(".restart").click(function () {
      location.reload();
    });
  }

  function GameOver () {
    if (population < 1) {
      $(".lose-screen").css("display", "block");
      $(".main-game-window").css("display", "none");
      gamePlaying = false;
    }
  }

  function WinGame () {
    if (population >= maxPopulation) {
      $(".win-screen").css("display", "block");
      $(".main-game-window").css("display", "none");
      gamePlaying = false;
    }
  }
});
