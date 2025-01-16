const predictSpecies = () => {
  let ph = $("#input-ph").val();
  let temp = $("#input-temp").val();
  let turb = $("#input-turb").val();

  if (ph == "" || ph < phMin || ph > phMax)
    alert(`PH must be between ${phMin} to ${phMax}`);
  else if (temp == "" || temp < tempMin || temp > tempMax)
    alert(`Temperature must be between ${tempMin} to ${tempMax}, now ${temp}`);
  else if (turb == "" || turb < turbMin || turb > turbMax)
    alert(`Turbidity must be between ${turbMin} to ${turbMax}`);
  else {
    $.ajax({
      url: "/predict",
      method: "POST",
      data: { ph: ph, temperature: temp, turbidity: turb },
      success: (res) => {
        console.log(res);
        let name = res.single;
        let others = "";
        res["other"].forEach((element) => {
          if (element != name) {
            if (others != "") others += ", ";
            others += element;
          }
        });

        $("#predictedFishTitle").text("Predicted fish species");
        $("#predictedFishTitle2").text("Possible fish species");
        $("#predictedFishNameId").text(name);
        $("#possibleFishTitle").text(others);
        // $("#input-ph").val("");
        // $("#input-temp").val("");
        // $("#input-turb").val("");

        $("#fish_image").css("display", "block");
        $("#fish_image").attr("src", `/static/res/fish_img/${name}.jpg`);
      }, //success
    }); //ajax
  }
};
//
const predictEnvironment = () => {
  let fname = $("#inputSelectFish").val();
  $.ajax({
    url: "/get_value_for_a_fish",
    method: "POST",
    data: { fish: fname },
    success: (res) => {
      let arr = res.split("|");
      let content = `
            <p>PH : ${arr[0]}</p>
            <p>Temperature : ${arr[1]}</p>
            <p>Turbidity : ${arr[2]}</p>
            `;
      $("#showEnvironmentValue").html(content);
    }, //success
  }); //ajax
};
