var gold = 100; //database
var harvest = 100; //database
var insuranceTotal = 0; // count of item
var insuranceCost = 50; // Premium minus away the coin - database
var insurancePayout = 500; // SumAssured add to coin - database
var hurricanceDamage = 100; // minus from harvest -database

function getUserByUID() {
  // var id = document.getElementById("goldQty").value = ${item.gold_points};
  fetch(`http://localhost:3000/customers/by-uid?id=${1}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // var text = `
      //   <table>
      //     <tr>
      //       <th>ID</th>
      //       <th>Full Name</th>
      //       <th>Mobile</th>
      //       <th>Email</th>
      //     </tr>`;

      data.forEach((item) => {
        document.getElementById("goldQty").innerHTML = ${item.gold_points};
        // text += `
        //                 <tr>
        //                   <td>${item.id}</td>
        //                   <td>${item.first_name} ${item.last_name}</td>
        //                   <td>${item.mobile}</td>
        //                   <td>${item.email}</td>
        //                 </tr>`;
      });
      // text += "</table>";
      $(".mypanel").html(text);
    })
    .catch((error) => console.log("error", error));
}

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
      alert("You have spent 50 coins to buy insurance");
      gold -= insuranceCost;
      insuranceTotal++;
      document.querySelector(".insurance").textContent = `${insuranceTotal}`;
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
    alert("Oh no! Hurricane Came! You lost 'hurricaneDamage' harvest"),
    300
  );
  harvest -= hurricanceDamage;
  document.getElementById("boardcast").innerText =
    "Lucky You! You brought insurance. Check your payout!";
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
