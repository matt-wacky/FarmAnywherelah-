//var gold = 100; //database
//var harvest = 100; //database
var insuranceTotal = 0; // count of item
//var insuranceCost = 50; // Premium minus away the coin - database
//var insurancePayout = 500; // SumAssured add to coin - database
var hurricanceDamage = 100; // minus from harvest -database

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

// gold , harvest, insuranceCost, insurancePayout 
fetch("http://localhost:3000/customers/by-uid?id=1", requestOptions)
  .then(res => res.json())
  .then(data => customer = data) 
  .then(() => gold = (customer[0].gold_points))             // gold
  .then(() => harvest = (customer[0].harvest_points))       // harvest
  .then(() => insuranceCost = (customer[0].premium))        // insuranceCost
  .then(() => insurancePayout = (customer[0].sum_assured))  // insurancePayout
  .catch(error => console.log('error', error));

let boardCastReset = function () {
  document.getElementById("boardcast").innerText = "";
  document.getElementById("confirmation").style.backgroundColor = "transparent";
  document.getElementById("confirmation").innerText = "";
};

document.querySelector(".water").addEventListener("click", () => {
  document.getElementById("story").src = "./images/water.png";
  boardCastReset();
});

document.querySelector(".insurance").addEventListener("click", () => {
  document.getElementById("story").src = "./images/insurance.png";

  let insuranceIsClick = true;
  if (insuranceIsClick) {
    document.getElementById("story").addEventListener("click", () => {

      var confirmBuy = confirm("Spend 50 coins to buy 1 insurance?");
      if (confirmBuy == true) {
          gold -= insuranceCost;
          insuranceTotal++
          document.querySelector(".insurance").textContent = `${insuranceTotal}`;
      } else 

      return null;

    });
  }

  boardCastReset();
});

document.querySelector(".spin").addEventListener("click", () => {
  document.getElementById("story").src = "./images/wheel.png";
  boardCastReset();
});

var danger = function () {
  document.getElementById("story").src = "./images/hurricane.png";
  setTimeout(
    alert("Oh no! \n Hurricane Came! \n \n You lost: \n\n • " + hurricanceDamage + " Harvest"),
    300
  );
  document.getElementById("boardcast").innerText =
    "💰💰 Lucky You! You brought insurance. 💰💰";
  document.getElementById("confirmation").style.backgroundColor = "green";
  document.getElementById("confirmation").style.color = "white";
  document.getElementById("confirmation").innerText = "Check PayOut!";
  harvest -= hurricanceDamage;
  if (insuranceTotal > 0) {
    gold += insurancePayout;
  } else
    document.getElementById("boardcast").innerText =
      "You should have bought insurance.";
  //document.getElementById("boardcast").innerText="The insurance co. paid you ${insurancePayout} coins" ;
};
