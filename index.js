$(document).ready(function () {
  var population = 1000;
  var births = 1;
  var birthRate;
  var deaths;
  var foodPopIncr = 1;
  var ccPoints = 0;

  var foodRequirement = 0;
  var foodTotal = 0;
  var foodCost = 1;
  var scienceTotal = 1;
  var scienceCost = 1;
  var techTotal = 0;
  var techCost = 1;

  var canBuyFood;
  var canBuyTech;
  var CanBuyScience;

  var techWorkerNum;

  var gameSpeed = 1000;

  DisplayStats();
  EarthClick();
  FoodButton();
  TechButton();
  GameManager();

// Functions to repeat according to gameSpeed
  function GameManager() {
    setInterval(function (){
      DisplayStats();
      DeathRateCalc();
      GameOver();
      FoodCostCheck();
      TechCostCheck();
      FoodReq();
      TechWorker();
      Death();
      Birth();
    }, gameSpeed);
  }

//This function displays all stats available on the page
  function DisplayStats() {
    $(".population").html(Math.floor(population));
    $(".birth-rate").html(Math.floor(births));
    $(".death-rate").html(Math.floor(deaths));
    $("span.food-cost").html(Math.floor(foodCost));
    $(".food-stat").html(Math.floor(foodTotal));
    $(".food-req").html(Math.floor(foodRequirement));
    $(".science-stat").html(Math.floor(scienceTotal));
    $(".cc-points").html(Math.floor(ccPoints));
    $(".tech-stat").html(Math.floor(techTotal));
    $(".tech-cost").html(Math.floor(techCost));
    $(".science-cost").html(Math.floor(scienceCost));
  }

//Calculation for the death rate. Death rate is a percentage of the population
  function DeathRateCalc () {
    if (foodTotal < foodRequirement) {
      deaths = population / 100 * 10 + 1;
    } else {
      deaths = population / 100 * 1 + 1;
    }
  }

  function FoodReq() {
    foodRequirement = population / 100 * 2;
  }

//CC Points earned per click earth image
  function Clicker () {
    ccPoints++;
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
      Clicker();
    });
  }

//A check to see if player has enough points to buy food
  function FoodCostCheck () {
    foodCost = foodTotal / scienceTotal + techTotal;
    if (ccPoints >= foodCost) {
      canBuyFood = true;
    } else {
      canBuyFood = false;
      console.log("Not enough CC Points for Food!");
    }
  }

  function TechCostCheck () {
    techCost = (techTotal + 1) * 10.5;
    techWorkerNum = techTotal;

    if (ccPoints >= techCost) {
      canBuyTech = true;
    } else {
      canBuyTech = false;
      console.log("Not enough CC Points for Tech!");
    }
  }

  function FoodButton () {
    $("button.food-pop-incr").click(function (event) {
    if (canBuyFood) {
        births += foodTotal;
        console.log("Plus Food");
        foodTotal++;
        ccPoints -= foodCost;
        DisplayStats();
      }
    });
  }

  function TechButton () {
    $("button.tech-incr").click(function (event) {
    if (canBuyTech) {
        console.log("Plus Tech");
        techTotal++;
        ccPoints -= techCost;
        DisplayStats();
      }
    });
  }

//For every tech worker add 1 CC Point per second
  function TechWorker() {
    ccPoints += techTotal;
  }

  function GameOver () {
    if (population < 2) {
      console.log("Catastrophe! There's no humans left!");
    }
  }
});
