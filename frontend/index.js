// var gold = 100; //database
//var harvest = 100; //database
var insuranceTotal = 0; // count of item
//var insuranceCost = 50; // Premium minus away the coin - database
//var insurancePayout = 500; // SumAssured add to coin - database
const hurricanceDamage = 20; // minus from harvest -database

function init() {
  //document.getElementById('gp').innerHTML = "130 Points";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/customers/all", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        document.getElementById("gp").innerHTML = customer[0].gold_points;
        document.getElementById("hp").innerHTML = item.harvest_points;
      });
    });
}

// b1.addEventListener("onload", init);

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

//assume from log in we know customer ID
const userID = "1";

var customerUrl = "http://localhost:3000/customers/by-uid?id=" + userID;

// gold , harvest, insuranceCost, insurancePayout
fetch(customerUrl, requestOptions)
  .then((res) => res.json())
  .then((data) => (customer = data))
  .then(() => (gold = customer[0].gold_points)) // gold
  .then(() => (harvest = customer[0].harvest_points)) // harvest
  .then(() => (insuranceCost = customer[0].premium)) // insuranceCost
  .then(() => (insurancePayout = customer[0].sum_assured)) // insurancePayout
  .catch((error) => console.log("error", error));

//
// document.getElementById("insuranceQty").innerText = insuranceTotal;
// document.getElementById("waterQty").innerText = waterTotal;
// document.getElementById("soilQty").innerText = soilTotal;
// document.getElementById("insuranceQty").innerText = insuranceTotal;

// Function to modify story img area
let boardCastReset = function () {
  document.getElementById("boardcast").innerText = "";
  document.getElementById("confirmation").style.backgroundColor = "transparent";
  document.getElementById("confirmation").innerText = "";
};

// -------------
// Buying Water
// -------------
document.querySelector(".water").onclick =
  ("click",
  () => {
    document.getElementById("story").src = "./images/water.png";
    boardCastReset();
  });

//
document.querySelector(".water").onclick =
  ("click",
  () => {
    document.getElementById("story").src = "./images/water.png";

    document.getElementById("story").onclick =
      ("click",
      () => {
        let confirmBuy = confirm(
          "Spend " + waterCost + " Gold to buy 1 bucket of water?"
        );
        if (confirmBuy == true) {
          gold -= waterCost;
          waterTotal++;
          document.getElementById("waterQty").innerText = waterTotal;
          //document.querySelector(".insurance").textContent = `${insuranceTotal}`;
          document.getElementById("gp").innerHTML = gold;
        } else return null;
      });
    //}

    boardCastReset();
  });

// -----------------
// Buying Insurance
// -----------------
document.querySelector(".insurance").onclick =
  ("click",
  () => {
    document.getElementById("story").src = "./images/insurance.png";

    //let insuranceIsClick = true;
    //if (insuranceIsClick) {
    document.getElementById("story").onclick =
      ("click",
      () => {
        let confirmBuy = confirm(
          "Spend " + insuranceCost + " Gold to buy 1 insurance policy?"
        );
        if (confirmBuy == true) {
          gold -= insuranceCost;
          insuranceTotal++;
          console.log("gold" + gold);
          console.log("insurance" + insuranceTotal);
          document.getElementById("insuranceQty").innerText = insuranceTotal;
          //document.querySelector(".insurance").textContent = `${insuranceTotal}`;
          document.getElementById("gp").innerHTML = gold;
        } else return null;
      });
    //}

    boardCastReset();
  });

// -----------------
// Wheel of Fortune
// -----------------
document.querySelector(".spin").addEventListener("click", () => {
  document.getElementById("story").src = "./images/wheel.png";
  boardCastReset();
});

// ----------------
// Hurricane event
// ----------------
var danger = function () {
  document.getElementById("story").src = "./images/hurricane.png";
  setTimeout(
    alert("Oh no! \n Hurricane Came! \n \n You have lost some harvest points."),
    300
  );

  // Default prompt

  document.getElementById("boardcast").innerText =
    "💰💰 Lucky You! 💰💰 \n You brought insurance. ";
  document.getElementById("boardcast").style.backgroundColor = "transparent";

  document.getElementById("confirmation").style.color = "white";
  document.getElementById("confirmation").innerText = "Claim PayOut";
  if (insuranceTotal > 0) {
    gold += insurancePayout;
    insuranceTotal--;
  }

  // Did not buy insurance, overriding prompt
  else {
    document.getElementById("boardcast").innerText =
      "You should have bought insurance. Learn More!";
  }

  harvest = harvest - hurricanceDamage;

  document.getElementById("insuranceQty").innerText = insuranceTotal;
  document.getElementById("hp").innerHTML = harvest;
  // insurancePayout = 0;
  console.log("gold danger: " + gold);
  console.log("harvest danger: " + harvest);
  document.getElementById("gp").innerHTML = gold;
  //document.getElementById("boardcast").style.backgroundColor = "grey";
  // document.getElementById("confirmation").style.backgroundColor = "grey";
  // document.getElementById("confirmation").style.color = "";
  //document.getElementById("confirmation").innerText = "No Payout";
};
