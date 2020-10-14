import axios from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5`
const API_KEY = `d3b219ab4ac3dde97f442a50f5d3c607`

const date = new Date();
const currentDay = date.getDate()

export async function fetchWeather(query) {
	try {
		const { data } = await axios.get(`${BASE_URL}/forecast?q=${query}&appid=${API_KEY}`);

		return formatData(data)
	} catch (error) {
		console.warn({ error })
		return { error: getErrorMessage(error) }
	}
}

export async function fetchInitialWeather() {
	try {
		const { lat, lon } = await getLocation()
		const { data } = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
		console.log({ data })
		return formatData(data)
	} catch (error) {
		console.warn({ error })
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

function formatData(data) {
	const { city, list } = data
	const res = formatForecastData(list)
	console.log({ currentDay })
	console.log({ res })

	return {
		timezone: city.timezone.toString(),
		cityName: city.name,
		forecast: formatForecastData(list),
		current: formatForecastData(list)[currentDay] || formatForecastData(list)[currentDay + 1]
	}
}


function getErrorMessage(error) {
	return error.message.includes('404') ? 'City not found' : 'Something went wrong. Please try again later'
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

