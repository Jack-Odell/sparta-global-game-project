$(document).ready(function () {
  var population = 2;
  var maxPopulaton = 100;
  var births = 1;
  var birthRate;
  var deaths;
  var foodPopIncr = 1;
  var ccPoints = 100;

  var foodRequirement = 0;
  var foodTotal = 1;
  var foodCost = 1;
  var foodLevel = 1;

  var scienceTotal = 0;
  var scienceCost = 1;
  var scienceFoodMod = 1;
  var techCCMod = 1;
  var techTotal = 0;
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

  DisplayStats();
  EarthClick();
  FoodButton();
  TechButton();
  ScienceButton();
  GameManager();
  Restart();

// Functions to repeat according to daySpeed and month
  function GameManager() {
    $(".win-screen").css("display", "none");
    $(".lose-screen").css("display", "none");
      setInterval(function () {
        FoodFarm();
      }, monthSpeed);

      setInterval(function (){
        if (gamePlaying) {
          DisplayStats();
          DeathRateCalc();
          GameOver();
          FoodCostCheck();
          TechCostCheck();
          ScienceCostCheck();
          FoodReq();
          Death();
          Birth();
          Progress();
          MonthCounter();
          WinGame();
        } else {
          population = maxPopulaton;
        }}, daySpeed);
      }

//This function displays all stats available on the page
  function DisplayStats() {
    $(".population").html(Math.floor(population));
    $(".max-population").html(Math.floor(maxPopulaton));
    $(".birth-rate").html(Math.floor(births));
    $(".death-rate").html(Math.floor(deaths));

    $("span.food-cost").html(Math.floor(foodCost));
    $(".food-stat").html(Math.floor(foodTotal));
    $(".food-req").html(Math.floor(foodRequirement));
    $(".food-lvl").html(Math.floor(foodLevel));

    $(".science-stat").html(Math.floor(scienceTotal));
    $(".science-cost").html(Math.floor(scienceCost));
    $(".tech-cost").html(Math.floor(techCost));
    $(".tech-stat").html(Math.floor(techTotal));

    $(".cc-points").html(Math.floor(ccPoints));

  }

//Calculation for the death rate. Death rate is a percentage of the population
  function DeathRateCalc () {
    if (foodTotal < foodRequirement / 3) {
      $(".food-req").css("color", "red");
      deaths = (population / 100) * 60 + 1;
    }
    else if (foodTotal < foodRequirement / 2) {
      $(".food-req").css("color", "orange");
      deaths = (population / 100) * 20 + 1;
    }
    else if (foodTotal > foodRequirement) {
      $(".food-req").css("color", "green");
      deaths = (population / 100) * 20 + 1;
    } else {
      deaths = (population / 100) * 2 + 1;
    }
  }

  var birthChance = function () {
    return Math.floor(Math.random() * Math.floor(4));
  }

//CC Points earned per click earth image
  function Clicker (mod) {
    ccPoints += mod;
    DisplayStats();
  }

//Amount for Birth Rate
  function Birth () {
    population += births;
    DisplayStats()
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
    foodTotal += foodLevel;
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
      if (canBuyFood) {
        console.log("Plus Food");
        foodLevel++
        population -= foodCost;
        foodCost *= 10;
        DisplayStats();
      }
    });
  }

  function TechCostCheck () {
    techCost = (techTotal + 1) * 10.5;

    if (population >= techCost) {
      canBuyTech = true;
    } else {
      canBuyTech = false;
    }
  }

  function TechButton () {
    $("button.tech-incr").click(function (event) {
    if (canBuyTech) {
        console.log("Plus Tech");
        techTotal++;
        ccPoints -= techCost;
        techCCMod *= 1.25;
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
        console.log("Plus Science!");
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
    progressPercent = population / maxPopulaton * 100;
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
    if (population >= maxPopulaton) {
      $(".win-screen").css("display", "block");
      $(".main-game-window").css("display", "none");
      gamePlaying = false;
    }
  }
});
