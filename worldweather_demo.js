// read the World Weather Online API key.
var fs = require("fs");
var key = fs.readFileSync("worldweatheronline.key");


var city = "London";
getCityWeather(city,function(err,data) {
    if (!err) {
    console.log("data = data",data);
        console.log(" city =",city);
        console.log(" time =",data.observation_time);
        console.log(" temperature =",    data.temperature);
        console.log(" pressure    =",    data.pressure);
    }
});


/// API http://api.worldweatheronline.com/premium/v1/weather.ashx?q=London&format=json&key=e9821fd760294de6baa83045160405

function getCityWeather(city,callback) {
    //var api_url="http://api.worldweatheronline.com/free/v2/weather.ashx?q="+city+"+&format=json&key="+ key;
    var api_url="http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+city+"+&format=json&key="+ key;
    var options = {
        url: api_url,
        "content-type": "application-json",
        json: ""
    };
    var request = require("request");
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data  = perform_read(city,body);
        callback(null,data);
      } else {
        callback(error);
      }
    });
}

function perform_read(city,body) {
    var obj = JSON.parse(body);
    var current_condition = obj.data.current_condition[0];
    var request = obj.data.request[0];
    return  {
        city:               request.query,
        date:               new Date(),
        observation_time:   current_condition.observation_time,
        temperature:        parseFloat(current_condition.temp_C),
        humidity:           parseFloat(current_condition.humidity),
        pressure:           parseFloat(current_condition.pressure),
        weather:            current_condition.weatherDesc.value
    };
}
