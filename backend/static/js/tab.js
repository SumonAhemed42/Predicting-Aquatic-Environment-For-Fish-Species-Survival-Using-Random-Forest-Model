var phMin = 0;
var phMax = 0;
var tempMin = 0;
var tempMax = 0;
var turbMin = 0;
var turbMax = 0;

$("#navTab1").on("click", () => {
  $("#navTab1").addClass("active");
  $("#navTab2").removeClass("active");

  $.ajax({
    url: "/get_min_max",
    method: "POST",
    success: (res) => {
      let arr = res.split("-");
      phMin = parseInt(arr[0]);
      phMax = parseInt(arr[1]);
      tempMin = parseInt(arr[2]);
      tempMax = parseInt(arr[3]);
      turbMin = parseInt(arr[4]);
      turbMax = parseInt(arr[5]);

      let content = `
    <div class="form">
                    <div class="inputbox">
                        <input type="number" required id="input-ph" name="ph">
                        <label>PH (${phMin}-${phMax})</label>
                    </div>
                    <div class="inputbox">
                        <input type="number" required id="input-temp" name="temp">
                        <label>Temperature (${tempMin}-${tempMax})</label>
                    </div>
                    <div class="inputbox">
                    <input type="number" required id="input-turb" name="turb">
                        <label>Turbidity (${turbMin}-${turbMax})</label>
                        </div>
                        <button class="predictBtn" onclick="predictSpecies()">Predict species</button>
                </div>
                <!-- .form -->
                
                <div class="resultBox">
                <p class="txt1" id="predictedFishTitle">No Result</p>
                <p class="txt2" id="predictedFishNameId"></p>
                <img src="/static/res/fish_img/katla.jpg" id="fish_image">
                <div class="txt1" id="predictedFishTitle2"></div>
                <div class="posibleName" id="possibleFishTitle"></div>
                </div>
                <!-- .resultBox -->
`;
      $("#subBox").html(content);
    }, //success
  }); //ajax
});

$("#navTab1").click();

$("#navTab2").on("click", () => {
  $("#navTab2").addClass("active");
  $("#navTab1").removeClass("active");
  $.ajax({
    url: "/get_fish_name",
    method: "POST",
    success: (res) => {
      let arr = res.split("-");

      let content = `
            <div class="form2">
            <div class="inputbox">
                <p class="label">Select fish species</p>
                <input type="text" placeholder="--select--" id="inputSelectFish">
                <ul id="opt-inputSelectFish">
                `;
      arr.forEach((element) => {
        content += `<li onclick='setOptValue("inputSelectFish","${element}")'>${element}</li>`;
      });
      content += `
                </ul>
            </div>
            <button class="predictBtn" onclick="predictEnvironment()">Predict environment</button>
            </div>
            <!-- .form2 -->
            
            <div class="resultBox2">
            <div class="h1">Aquatic environment</div>
            <div class="txt" id="showEnvironmentValue">
                <p>No result</p>
            </div>
            </div>
            <!-- .resultBox2 -->
            `;
      $("#subBox").html(content);

      setTimeout(() => {
        $("#inputSelectFish").on("focus", () => {
          $("#opt-inputSelectFish").css("display", "block");
        });
        $("#inputSelectFish").on("blur", () => {
          setTimeout(() => {
            $("#opt-inputSelectFish").css("display", "none");
          }, 250);
        });
      }, 500);
    }, //success
  }); //ajax
});

var setOptValue = (inputID, value) => {
  $("#" + inputID).val(value);
};
