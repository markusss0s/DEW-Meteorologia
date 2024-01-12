const select = document.getElementById("provincias");

function loadProvinces() {
  fetch("https://www.el-tiempo.net/api/json/v2/provincias")
    .then((res) => res.json())
    .then((json) => {
      json.provincias.forEach((provincia) => {
        const option = document.createElement("option");
        option.append(provincia.NOMBRE_PROVINCIA);
        option.value = provincia.CODPROV;
        select.append(option);
      });
    });
}

function home() {
  fetch("https://www.el-tiempo.net/api/json/v2/home")
    .then((res) => res.json())
    .then((json) => {
      console.log(json.tomorrow.p);
      const todayDiv = document.getElementById("today");
      const tomorrowDiv = document.getElementById("tomorrow");
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
// function timeProvince() {
//   const
//   fetch();
// }
const option = document.getElementById("provincias");
console.log(option);
// const home = document.getElementById('home');
home();
loadProvinces();
