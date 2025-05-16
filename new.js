const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const condition = data.weather[0].main;
      const outfit = suggestOutfit(temp, condition);

      document.getElementById("result").innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${condition}</p>
        <p><strong>Outfit Suggestion:</strong> ${outfit}</p>
      `;
    })
    .catch((error) => {
      document.getElementById("result").innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function suggestOutfit(temp, condition) {
  if (condition.toLowerCase().includes("rain")) {
    return "Carry an umbrella and wear waterproof shoes.";
  } else if (temp <= 10) {
    return "Wear a warm coat, gloves, and a beanie.";
  } else if (temp <= 20) {
    return "Wear a light jacket or sweater.";
  } else if (temp <= 30) {
    return "T-shirt and jeans should be fine.";
  } else {
    return "Light clothes and stay hydrated!";
  }
}
