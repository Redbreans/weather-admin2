import index_ultraviolet_ray from "@/assets/images/index_ultraviolet_ray.png"
import index_human_body from "@/assets/images/index_human_body.png"
import index_exercise from "@/assets/images/index_exercise.png"
import index_Air_drying from "@/assets/images/index_Air_drying.png"
import index_dressing from "@/assets/images/index_dressing.png"
import index_Rain_gear from "@/assets/images/index_Rain_gear.png"
import index_trip from "@/assets/images/index_trip.png"
import index_The_driving from "@/assets/images/index_The_driving.png"
import index_go_through from "@/assets/images/index_go_through.png"
import index_road from "@/assets/images/index_road.png"
import index_Mountain_climbing from "@/assets/images/index_Mountain_climbing.png"
import index_fishing from "@/assets/images/index_fishing.png"
//Trip  ----出行      ==============      新增
import trip from "@/assets/images/trip.png"
//fishing  ---垂钓    
import fishing from "@/assets/images/fishing.png"
//skiing ------滑雪
import skiing from "@/assets/images/skiing.png"
//晾晒----airing
import airing from "@/assets/images/airing.png"
//humanbody---人体
import humanbody from "@/assets/images/humanbody.png"
//umbrella  --伞
import umbrella from "@/assets/images/umbrella.png"
// hotspringweather   ---温泉气象
import hotspringweather from "@/assets/images/hotspringweather.png"
//glare---霞光气象
import glare from "@/assets/images/glare.png"
//skymeteorology  ---星光气象
import skymeteorology from "@/assets/images/skymeteorology.png"

//cloudsea ---云海气象
import cloudsea from "@/assets/images/cloudsea.png"
//sport---运动
import sport from "@/assets/images/sport.png"
//clothes---着装
import clothes from "@/assets/images/clothes.png"
//ultravioletrays  --紫外线
import ultravioletrays from "@/assets/images/ultravioletrays.png"

function getIndexNameImg(indexName) {
  var roadIndexImg = '';
  if (indexName === '紫外线指数') {
    roadIndexImg = index_ultraviolet_ray;
  } else if (indexName === "人体舒适度气象指数") {
    roadIndexImg = index_human_body;
  } else if (indexName === "冬季锻炼气象指数") {
    roadIndexImg = index_exercise;
  } else if (indexName === "晾晒气象指数") {
    roadIndexImg = index_Air_drying;
  } else if (indexName === "增减衣气象指数") {
    roadIndexImg = index_dressing;
  } else if (indexName === "雨具携带气象指数") {
    roadIndexImg = index_Rain_gear;
  } else if (indexName === "出行指数") {
    roadIndexImg = index_trip;
  } else if (indexName === "行车指数") {
    roadIndexImg = index_The_driving;
  } else if (indexName === "通行指数") {
    roadIndexImg = index_go_through;
  } else if (indexName === "道路指数") {
    roadIndexImg = index_road;
  } else if (indexName === "登山指数") {
    roadIndexImg = index_Mountain_climbing;
  } else if (indexName === "垂钓指数") {
    roadIndexImg = index_fishing;
  }else if (indexName === "出行指数") {
    roadIndexImg = trip;
  }else if (indexName === "滑雪气象指数") {
    roadIndexImg = skiing;
  }else if (indexName === "晾晒指数") {
    roadIndexImg = airing;
  }else if (indexName === "人体指数") {
    roadIndexImg = humanbody;
  }else if (indexName === "伞指数") {
    roadIndexImg = umbrella;
  }else if (indexName === "温泉气象指数") {
    roadIndexImg = hotspringweather;
  }else if (indexName === "霞光气象指数") {
    roadIndexImg = glare;
  }else if (indexName === "星空气象指数") {
    roadIndexImg = skymeteorology;
  }else if (indexName === "云海观赏指数") {
    roadIndexImg = cloudsea;
  }

  return roadIndexImg;
}

export default {
  getIndexNameImg: getIndexNameImg
}
