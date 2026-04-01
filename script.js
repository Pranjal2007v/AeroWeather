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