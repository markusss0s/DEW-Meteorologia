const selectProvince = document.getElementById("provinces");
const selectTown = document.getElementById("town");
const todayDiv = document.getElementById("today");
const tomorrowDiv = document.getElementById("tomorrow");
const site = document.getElementById("site");
let CODPROV;
//DETALLES DE MOSTRAR LA PROVINCIA Y MUNICIPIO LA CUAL VAMOS A MIRAR EL TIEMPO
//DETALLES DE MOSTRAR LA PROVINCIA Y MUNICIPIO LA CUAL VAMOS A MIRAR EL TIEMPO
//DETALLES DE MOSTRAR LA PROVINCIA Y MUNICIPIO LA CUAL VAMOS A MIRAR EL TIEMPO
//DETALLES DE MOSTRAR LA PROVINCIA Y MUNICIPIO LA CUAL VAMOS A MIRAR EL TIEMPO
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
      console.log(json1);
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
          console.log("JSON2: ", json2);
          const option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.textContent = "Selecciona un municipio";
          selectTown.append(option);
          json2.municipios.forEach((town) => {
            const option = document.createElement("option");
            option.textContent = town.NOMBRE;
            option.value = town.COD_GEO;

            selectTown.append(option);
          });
        });
    });
}

function loadWeatherTown() {
  let index = selectTown.selectedIndex;
  let COD_GEO = selectTown.options[index].value;
  let PROVINCE = selectTown.options[index].text;
  fetch(
    "https://www.el-tiempo.net/api/json/v2/provincias/" +
      CODPROV +
      "/municipios/" +
      COD_GEO
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const p = document.createElement("p");
      p.textContent =
        json.stateSky.description +
        " " +
        json.temperatura_actual +
        "ºC " +
        "(max: " +
        json.temperaturas.max +
        " | " +
        " min:" +
        json.temperaturas.min +
        ")";
      console.log(json.temperaturas.min);
      todayDiv.append(p);
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
