import weather_sunny_night from "@/assets/weather/weather_sunny_night.png"
import weather_cloudy_night from "@/assets/weather/weather_cloudy_night.png"
import weather_shower_night from "@/assets/weather/weather_shower_night.png"
import weather_ray_electricity_rain_night from "@/assets/weather/weather_ray_electricity_rain_night.png"
import weather_thunder_rain_night from "@/assets/weather/weather_thunder_rain_night.png"
import weather_thundershower_hail_night from "@/assets/weather/weather_thundershower_hail_night.png"

import weather_overcast from "@/assets/weather/weather_overcast.png"
import weather_ray_electricity from "@/assets/weather/weather_ray_electricity.png"
// import weather_thundershower from "@/assets/weather/weather_thundershower.png"
import weather_rain_light from "@/assets/weather/weather_rain_light.png"
import weather_rain from "@/assets/weather/weather_rain.png"
import weather_rain_heavy from "@/assets/weather/weather_rain_heavy.png"
import weather_rainstorm from "@/assets/weather/weather_rainstorm.png"
import weather_rainstorm_heavy from "@/assets/weather/weather_rainstorm_heavy.png"
import weather_rainstorm_extraHeavy from "@/assets/weather/weather_rainstorm_extraHeavy.png"
import weather_hail from "@/assets/weather/weather_hail.png"
import weather_ice_needle from "@/assets/weather/weather_ice_needle.png"
import weather_sleet from "@/assets/weather/weather_sleet.png"
import weather_snow_light from "@/assets/weather/weather_snow_light.png"
import weather_snow from "@/assets/weather/weather_snow.png"
import weather_snow_heavy from "@/assets/weather/weather_snow_heavy.png"
import weather_snowstorm from "@/assets/weather/weather_snowstorm.png"
import weather_snows from "@/assets/weather/weather_snows.png"
import weather_frost from "@/assets/weather/weather_frost.png"
import weather_freeze from "@/assets/weather/weather_freeze.png"
import weather_wind from "@/assets/weather/weather_wind.png"
import weather_tornado from "@/assets/weather/weather_tornado.png"
import weather_typhoon from "@/assets/weather/weather_typhoon.png"
import weather_squall from "@/assets/weather/weather_squall.png"
import weather_dust_devil from "@/assets/weather/weather_dust_devil.png"
import weather_floating_dust from "@/assets/weather/weather_floating_dust.png"
import weather_fhaze from "@/assets/weather/weather_fhaze.png"
import weather_blowing_sand from "@/assets/weather/weather_blowing_sand.png"
import weather_sand_storm_heavy from "@/assets/weather/weather_sand_storm_heavy.png"
import weather_fog from "@/assets/weather/weather_fog.png"
import weather_aurora from "@/assets/weather/weather_aurora.png"

//判断夜晚的天气
function getNightImg(weather) {
  var nightWeatherUrl = '';

  if (weather === '晴') {
    nightWeatherUrl = weather_sunny_night;
  } else if (weather === "阴转晴" || weather === "多云转晴" || weather === "晴转多云") {
    nightWeatherUrl = weather_cloudy_night;
  } else if (weather === "小雨转晴") {
    nightWeatherUrl = weather_shower_night;
  } else if (weather === "雷电转晴") {
    nightWeatherUrl = weather_ray_electricity_rain_night;
  } else if (weather === "雷阵雨转晴") {
    nightWeatherUrl = weather_thunder_rain_night;
  } else if (weather === "雷阵雨伴有冰雹转晴") {
    nightWeatherUrl = weather_thundershower_hail_night;
  } else if (weather === "阴" || weather === "多云") {
    nightWeatherUrl = weather_overcast;
  } else if (weather === "闪电") {
    nightWeatherUrl = weather_ray_electricity;
  }
  // else if(weather==="雷阵雨"){
  // 	nightWeatherUrl=weather_thundershower;
  // } //无图
  else if (weather === "小雨") {
    nightWeatherUrl = weather_rain_light;
  } else if (weather === "中雨") {
    nightWeatherUrl = weather_rain;
  } else if (weather === "大雨") {
    nightWeatherUrl = weather_rain_heavy;
  } else if (weather === "暴雨") {
    nightWeatherUrl = weather_rainstorm;
  } else if (weather === "大暴雨") {
    nightWeatherUrl = weather_rainstorm_heavy;
  } else if (weather === "特大暴雨") {
    nightWeatherUrl = weather_rainstorm_extraHeavy;
  } else if (weather === "冰雹") {
    nightWeatherUrl = weather_hail;
  } else if (weather === "冰针") {
    nightWeatherUrl = weather_ice_needle;
  } else if (weather === "雨夹雪") {
    nightWeatherUrl = weather_sleet;
  } else if (weather === "小雪") {
    nightWeatherUrl = weather_snow_light;
  } else if (weather === "中雪") {
    nightWeatherUrl = weather_snow;
  } else if (weather === "大雪") {
    nightWeatherUrl = weather_snow_heavy;
  } else if (weather === "暴风雪") {
    nightWeatherUrl = weather_snowstorm;
  } else if (weather === "积雪") {
    nightWeatherUrl = weather_snows;
  } else if (weather === "霜冻") {
    nightWeatherUrl = weather_frost;
  } else if (weather === "结冰") {
    nightWeatherUrl = weather_freeze;
  } else if (weather === "风") {
    nightWeatherUrl = weather_wind;
  } else if (weather === "龙卷风") {
    nightWeatherUrl = weather_tornado;
  } else if (weather === "台风") {
    nightWeatherUrl = weather_typhoon;
  } else if (weather === "飑") {
    nightWeatherUrl = weather_squall;
  } else if (weather === "尘卷风") {
    nightWeatherUrl = weather_dust_devil;
  } else if (weather === "浮尘") {
    nightWeatherUrl = weather_floating_dust;
  } else if (weather === "霾") {
    nightWeatherUrl = weather_fhaze;
  } else if (weather === "扬沙") {
    nightWeatherUrl = weather_blowing_sand;
  } else if (weather === "强沙尘暴") {
    nightWeatherUrl = weather_sand_storm_heavy;
  } else if (weather === "雾") {
    nightWeatherUrl = weather_fog;
  } else if (weather === "极光") {
    nightWeatherUrl = weather_aurora;
  }

  return nightWeatherUrl;
}


export default {
  getNightImg: getNightImg
}
