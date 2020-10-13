import axios from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5`
const API_KEY = `d3b219ab4ac3dde97f442a50f5d3c607`
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
export async function fetchForecastWeather(query) {
	try {
		const { data } = await axios.get(`${BASE_URL}/forecast?q=${query}&appid=${API_KEY}`);
		return { forecastWeatherData: formatForecastData(data.list) }
	} catch (error) {
		console.log({ error })
	}
}

export async function fetchCurrentWeather(query) {
	try {
		const { data } = await axios.get(`${BASE_URL}/weather?q=${query}&appid=${API_KEY}`);
		return { currentWeatherData: formatForecastData(data.list) }
	} catch (error) {
		console.log({ error })
	}
}

export async function fetchInitialCurrentWeather() {
	try {
		const { lat, lon } = await getLocation()
		const { data } = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
		return { cityName: data.name, currentWeatherData: data.main }
	} catch (error) {
		console.log({ error })
		return await fetchCurrentWeather('vilnius')
	}
}

function formatForecastData(list) {
	return list.reduce((acc, next) => {
		const date = new Date(next.dt * 1000);
		const currentDay = date.getDate().toString();
		if (!acc[currentDay]) {
			acc[currentDay] = [next];
		} else {
			acc[currentDay].push(next);
		}
		return acc;
	}, {});
}

async function getLocation() {
	return new Promise((res, rej) => {
		if (!navigator.geolocation) rej("navigator is not supported")
		navigator.geolocation.getCurrentPosition(position => {
			res({
				lon: position.coords.longitude,
				lat: position.coords.latitude
			})
		})
	})

}

