$(document).ready(function () {
  var population = 100;
  var maxPopulaton = 1000000000;
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

  var gameSpeed = 1000;

  var barWidth = 1;
  var progressPercent;

  DisplayStats();
  EarthClick();
  FoodButton();
  TechButton();
  ScienceButton();
  GameManager();

// Functions to repeat according to gameSpeed
  function GameManager() {
    setInterval(function (){
      DisplayStats();
      DeathRateCalc();
      GameOver();
      FoodCostCheck();
      FoodFarm();
      TechCostCheck();
      ScienceCostCheck();
      FoodReq();
      TechWorker();
      HumanWorker();
      Death();
      Birth();
      Progress();
    }, gameSpeed);
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
    if (foodTotal < foodRequirement) {
      deaths = (population / 100) * 10 + 1;
    } else {
      deaths = (population / 100) + 1;
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
  }
//A check to see if player has enough points to buy food
  function FoodCostCheck () {
    if (ccPoints >= foodCost) {
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
        ccPoints -= foodCost;
        foodCost *= 1.5;
        DisplayStats();
      }
    });
  }

  function TechCostCheck () {
    techCost = (techTotal + 1) * 10.5;
    techWorkerNum = techTotal;

    if (ccPoints >= techCost) {
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

    if (ccPoints >= scienceCost) {
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
        ccPoints -= scienceCost;
        foodTotal *= 1.5;
        births += foodTotal;
        DisplayStats();
      }
    });
  }

//For every tech worker add 1 CC Point per second
  function TechWorker() {
    ccPoints += techTotal;
  }

  function HumanWorker () {
    ccPoints += population / 100000;
  }

  function FoodWorker () {
    foodTotal += foodMod;
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

  function GameOver () {
    if (population < 2) {
      console.log("Catastrophe! There are no humans left!");
    }
  }
});
