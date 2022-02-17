var unirest = require("unirest");

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/find");

req.query({
	"q": "london",
	"cnt": "0",
	"mode": "null",
	"lon": "0",
	"type": "link, accurate",
	"lat": "0",
	"units": "imperial, metric"
});

req.headers({
	"x-rapidapi-key": "fd23a2d71bmsha17a18ba438a7adp1ea3bbjsn1b8814f787f4",
	"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});