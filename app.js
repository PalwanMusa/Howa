const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";
const API = "&units=metric&cnt=4&appid=c49f2a5b07ce03250befb407c4410be3";
const cityName = document.getElementById("city");
const mornTime = document.getElementById("morn");
const dayTime = document.getElementById("day");
const nightTime = document.getElementById("night");
const eveTime = document.getElementById("eve");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");
const nowDisplayer = document.getElementById("nowDisplayer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
let now = document.getElementById("now");

let morn;
let day;
let night;
let eve;

console.log("hello");

const fetchData = async (myCity) => {
  const response = await axios.get(weatherUrl + myCity + API);
  console.log(response);

  const obj = {
    name: "Sohbet",
    surName: "Danegulyyew",
  };

  const data = await response.data;
  const city = data.city.name;
  morn = data.list[0].temp.morn;
  day = data.list[0].temp.day;
  night = data.list[0].temp.night;
  eve = data.list[0].temp.eve;

  cityName.innerHTML = city + " şäheri";
  dayTime.innerHTML = day.toFixed(0) + "°C";
  eveTime.innerHTML = eve.toFixed(0) + "°C";
  mornTime.innerHTML = morn.toFixed(0) + "°C";
  nightTime.innerHTML = night.toFixed(0) + "°C";
};

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const fullHour = hour < 10 ? "0" + hour : hour;
  const fullMinute = minute < 10 ? "0" + minute : minute;
  const fullSecond = second < 10 ? "0" + second : second;
  const dateString = date.toDateString();

  if (hour >= 9 && hour <= 13) {
    now.innerText = morn.toFixed(0) + "°C";
    nowDisplayer.innerHTML = morn.toFixed(0) + "°C";
  } else if (hour >= 13 && hour <= 18) {
    now.innerText = day.toFixed(0) + "°C";
    nowDisplayer.innerHTML = day.toFixed(0) + "°C";
  } else if (hour >= 18 && hour <= 22) {
    now.innerText = night.toFixed(0) + "°C";
    nowDisplayer.innerHTML = night.toFixed(0) + "°C";
  } else {
    now.innerText = eve.toFixed(0) + "°C";
    nowDisplayer.innerHTML = eve.toFixed(0) + "°C";
  }

  currentTime.innerHTML = `${fullHour}:${fullMinute}:${fullSecond}`;
  currentDate.innerHTML = dateString;
};

setInterval(() => {
  if (morn) {
    getTime();
  }
}, 1000);

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  fetchData(city);
});
