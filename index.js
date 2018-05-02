$(document).ready(function () {
  var population = 100;
  var maxPopulation = 1000000000;
  var births = 1;
  var deaths = 0;
  var foodPopIncr = 1;
  var ccPoints = 100;

  var foodRequirement = 0;
  var foodTotal = 1;
  var foodCost = 1;
  var foodLevel = 1;
  var foodMod = 1;

  var scienceTotal = 0;
  var scienceCost = 1;
  var scienceFoodMod = 1;
  var techCCMod = 1;
  var techTotal = 0;
  var techLevel = 1;
  var techCost = 1;

  var canBuyFood;
  var canBuyTech;
  var CanBuyScience;

  var techWorkerNum;

  var daySpeed = 1000;
  var monthSpeed = 5000;

  var barWidth = 1;
  var progressPercent;

  var monthPercent = 0;

  var gamePlaying = true;

//Bools for disaster events
  var earthquake = false;
  var plague = false;
  var war = false;
  var famine =false;

  DisplayStats();
  EarthClick();
  FoodButton();
  TechButton();
  ScienceButton();
  GameManager();
  Restart();

// Functions to repeat according to daySpeed and month
  function GameManager() {
    if (gamePlaying) {
    $(".win-screen").css("display", "none");
    $(".lose-screen").css("display", "none");
      setInterval(function () {
        FoodFarm();
      }, monthSpeed);

      setInterval(function (){
          DisplayStats();
          DeathRateCalc();
          GameOver();
          TechCostCheck();
          ScienceCostCheck();
          FoodReq();
          Birth();
          Death();
          Progress();
          MonthCounter();
          WinGame();
        }, daySpeed);
    } else {
      population = maxPopulation;
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
    TheStat(".science-stat", scienceTotal);
    TheStat(".science-cost", scienceCost);
    TheStat(".tech-cost", techCost);
    TheStat(".tech-lvl", techLevel);
    TheStat(".tech-stat", techTotal);
  }

//Calculation for the death rate. Death rate is a percentage of the population
  function DeathRateCalc () {
    if (foodTotal < foodRequirement / 3) {
      $(".food-req").css("color", "red");
      deaths = (population / 100) * 60 + 1;
    }
    else if (foodTotal < foodRequirement / 2) {
      $(".food-req").css("color", "orange");
      deaths = (population / 100) * 50 + 1;
    }
    else if (foodTotal > foodRequirement) {
      $(".food-req").css("color", "green");
      deaths = (population / 100) * 30 + 1;
    } else {
      deaths = (population / 100) * 40 + 1;
    }
  }

//CC Points earned per click earth image
  function Clicker (mod) {
    foodTotal += mod;
    // $(".earth")css("transform", scale(1.5, 1.5));
    DisplayStats();
  }

//Amount for Birth Rate
  function Birth () {
    var popIncr = births - deaths;
    population += births;
    PlusIndicator(popIncr);
    DisplayStats();
  }

  function PlusIndicator (theVar) {
    if (document.hasFocus()) {
      if (theVar > 0) {
        $(".pop-plus-indicator").html("+" + (Math.floor(theVar).toLocaleString())).slideToggle(50).fadeOut(600);
    }
  }
}

//Amount for Death Rate
  function Death () {
    population -= deaths;
    DisplayStats();
  }

  function EarthClick () {
    $(".earth").click(function (event) {
      Clicker(techCCMod);
    });
  }

  function FoodFarm () {
    foodTotal += (foodLevel * foodLevel * foodLevel * foodLevel) * foodMod;
    births += foodTotal;
  }

  function FoodReq() {
    foodRequirement = (population / 100) + 1;
    return foodRequirement;
  }
//A check to see if player has enough points to buy food
  function FoodCostCheck () {
    if (population >= foodCost) {
      canBuyFood = true;
    } else {
      canBuyFood = false;
    }
  }

  function FoodButton () {
    $("button.food-pop-incr").click(function (event) {
      FoodCostCheck();
      if (canBuyFood) {
        foodLevel++
        foodMod++;
        population -= foodCost;
        foodCost *= 5;
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

  function TechButton () {
    $("button.tech-incr").click(function (event) {
    if (canBuyTech) {
        techTotal++;
        population -= techCost;
        techCCMod *= 1.5;
        techCost *= 2.5;
        techLevel++;
        DisplayStats();
      }
    });
  }

  function ScienceCostCheck () {
    scienceCost = (scienceTotal + 1) * 21;

    if (population >= scienceCost) {
      canBuyScience = true;
    } else {
      canBuyScience = false;
    }
  }

  function ScienceButton () {
    $("button.science-incr").click(function (event) {
    if (canBuyScience) {
        scienceTotal++;
        population -= scienceCost;
        foodTotal *= 1.5;
        births += foodTotal;
        DisplayStats();
      }
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

  function DisasterEvent () {

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
