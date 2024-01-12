const select = document.getElementById("provincias");

function loadProvinces() {
  fetch("json/provincias.json")
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

// function tomoTod(day, div) {
//   fetch("json/home.json")
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json);
//     json.day.p.forEach((p) => {
//       const pDay = document.createElement("p");
//       pDay.append(p);
//       div.append(pDay);
//     });
//   });
// }

function home() {
  fetch("json/home.json")
    .then((res) => res.json())
    .then((json) => {
      console.log(json.tomorrow.p);
      const todayDiv = document.getElementById("today");
      const tomorrowDiv = document.getElementById("tomorrow");
      // tomoTod(today, todayDiv);
      // tomoTod(tomorrow);
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
// const home = document.getElementById('home');
home();
loadProvinces();
