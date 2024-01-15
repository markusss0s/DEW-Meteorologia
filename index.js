const selectProvince = document.getElementById("provinces");
const selectTown = document.getElementById("town");
const todayDiv = document.getElementById("today");
const tomorrowDiv = document.getElementById("tomorrow");
const site = document.getElementById("site");
let CODPROV;
function loadProvinces() {
  fetch("https://www.el-tiempo.net/api/json/v2/provincias")
    .then((res) => res.json())
    .then((json) => {
      json.provincias.forEach((province) => {
        const option = document.createElement("option");
        option.append(province.NOMBRE_PROVINCIA);
        option.value = province.CODPROV;
        selectProvince.append(option);
      });
    });
}

function home() {
  fetch("https://www.el-tiempo.net/api/json/v2/home")
    .then((res) => res.json())
    .then((json) => {
      todayDiv.innerHTML = "";
      tomorrowDiv.innerHTML = "";

      json.today.p.forEach((p) => {
        const p2 = document.createElement("p");
        p2.append(p);
        todayDiv.append(p2);
      });
      json.tomorrow.p.forEach((p) => {
        const p2 = document.createElement("p");
        p2.append(p);
        tomorrowDiv.append(p2);
      });
    });
}
function loadWeatherProvince() {
  let index = selectProvince.selectedIndex;
  CODPROV = selectProvince.options[index].value;
  let PROVINCE = selectProvince.options[index].text;
  site.textContent = "El tiempo en la provincia de " + PROVINCE;
  fetch("https://www.el-tiempo.net/api/json/v2/provincias/" + CODPROV)
    .then((res) => res.json())
    .then((json1) => {
      let todayP = document.createElement("p");
      let tomorrowP = document.createElement("p");
      todayP.textContent = json1.today.p;
      todayDiv.append(todayP);
      tomorrowP.textContent = json1.tomorrow.p;
      tomorrowDiv.append(tomorrowP);
      fetch(
        "https://www.el-tiempo.net/api/json/v2/provincias/" +
        CODPROV +
        "/municipios"
      )
        .then((res) => res.json())
        .then((json2) => {
          console.log(json2);
          const option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.textContent = "Selecciona un municipio";
          selectTown.append(option);
          json2.municipios.forEach((town) => {
            const option = document.createElement("option");
            option.textContent = town.NOMBRE;
            option.value = town.CODIGOINE.substr(0, 5);
            console.log(town.CODIGOINE);
            selectTown.append(option);
          });
        });
    });
}

function loadWeatherTown() {
  let index = selectTown.selectedIndex;
  let CODIGOINE = selectTown.options[index].value;
  let TOWN = selectTown.options[index].text;
  site.textContent = TOWN;
  fetch(
    "https://www.el-tiempo.net/api/json/v2/provincias/" +
    CODPROV +
    "/municipios/" +
    CODIGOINE
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const todayP = document.createElement("p");
      todayP.textContent = `${json.stateSky.description} ${json.temperatura_actual} ºC 
      (max: ${json.temperaturas.max} ºC | min: ${json.temperaturas.min} ºC)`;
      todayDiv.append(todayP);
      const tomorrowP = document.createElement("p");
      tomorrowP.textContent = `${json.proximos_dias[0].estado_cielo_descripcion[0]} 
      (max: ${json.proximos_dias[0].temperatura.maxima} ºC | min: ${json.proximos_dias[0].temperatura.minima} ºC)`
      tomorrowDiv.append(tomorrowP);
    });
}

selectProvince.addEventListener("change", () => {
  if (selectProvince.selectedIndex < 0) {
    home();
    site = "El Tiempo";
  } else {
    todayDiv.innerHTML = "";
    tomorrowDiv.innerHTML = "";
    selectTown.innerHTML = "";
  }
});

selectTown.addEventListener("change", () => {
  if (selectTown.selectedIndex < 0) {
    loadWeatherProvince();
  } else {
    todayDiv.innerHTML = "";
    tomorrowDiv.innerHTML = "";

  }
});
window.onload = home;
loadProvinces();
