(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "one" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
	window.onload = function() {
		var  page = document.getElementsByClassName("ui-page-active")[0];
		page.querySelector("#weather-btn").addEventListener("click", getWeather);
		
		function reqListener () {
		  var result = JSON.parse(this.responseText);
		  page.querySelector("#city").innerHTML = result.name;
		  page.querySelector("#weather").innerHTML = result.weather[0].main + " - " + result.weather[0].description;
		  page.querySelector("#temp").innerHTML = result.main.temp;
		  page.querySelector("#humidity").innerHTML = result.main.humidity;
		  page.querySelector("#wind").innerHTML = result.wind.speed;
		}
		
		function getWeather() {
			var oReq = new XMLHttpRequest();
			oReq.addEventListener("load", reqListener);
			oReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=1717511&units=metric&appid={{appid}}");
			oReq.send();
		}
	};
	
	
}());