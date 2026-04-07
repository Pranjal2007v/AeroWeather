const apiKey = "cca7c588ac1e7b0275baef2758da67e8"; 

async function getWeather() {
  const cityInput = document.getElementById("search").value;
  const loading = document.getElementById("loading");

  if (!cityInput) return alert("Enter a city name");

  loading.classList.remove("load");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    loading.classList.add("load");

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("desc").innerText = `🌥️ ${data.weather[0].description}`;

  } catch (error) {
    loading.classList.add("hidden");
    alert("Error fetching data");
  }
}

let data = [];
let current = [];

document.getElementById("addBtn").addEventListener("click", async () => {
  const cityInput = document.getElementById("searchBox").value;
  if (!cityInput) return alert("Enter a city name");
  
  document.getElementById("loading").classList.remove("hide");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
    );
    const result = await response.json();

    document.getElementById("loading").classList.add("hide");

    if (result.cod !== 200) {
      alert("City not found");
      return;
    }
    
    const newCity = {
      name: result.name,
      temp: result.main.temp,
      desc: result.weather[0].description,
      like: false
    };
    
    if (!data.some(c => c.name.toLowerCase() === newCity.name.toLowerCase())) {
      data.push(newCity);
      filterData(document.getElementById("filter").value || "all");
      if (document.getElementById("sort").value) {
          sortData(document.getElementById("sort").value);
      }
    } else {
      alert("City already added");
    }
    document.getElementById("searchBox").value = "";
  } catch (error) {
    document.getElementById("loading").classList.add("hide");
    alert("Error fetching data");
  }
});

document.getElementById("searchFilter").addEventListener("input", searchData);
document.getElementById("filter").addEventListener("change", (e) => filterData(e.target.value));
document.getElementById("sort").addEventListener("change", (e) => sortData(e.target.value));
document.getElementById("modeBtn").addEventListener("click", toggleMode);

document.getElementById("loading").classList.add("hide");

function searchData() {
  let text = document.getElementById("searchFilter").value.toLowerCase();

  current = data.filter(item =>
    item.name.toLowerCase().includes(text)
  );

  show();
}

function filterData(type) {
  if (type === "hot") {
    current = data.filter(item => item.temp > 25);
  } else if (type === "cold") {
    current = data.filter(item => item.temp < 20);
  } else {
    current = [...data];
  }

  show();
}

function sortData(type) {
  if (type === "asc") {
    current = [...current].sort((a, b) => a.temp - b.temp);
  } else if (type === "desc") {
    current = [...current].sort((a, b) => b.temp - a.temp);
  } else if (type === "name") {
    current = [...current].sort((a, b) => a.name.localeCompare(b.name));
  }

  show();
}




function toggleMode() {
  document.body.classList.toggle("dark");
}

function show() {
  let div = document.getElementById("list");

  div.innerHTML = current.map(item => `
    <div class="box">
      <h3>${item.name}</h3>
      <p>🌡️ Temp: ${item.temp}°C</p>
      <p>🌥️ ${item.desc}</p>
    </div>
  `).join("");
}

show();