
const baseUrl = process.env.BASE_FILE_URL;

const readImageUrl = baseUrl +'/front/frontFile/read?fileId='//读取图片
let language = 0 //默认显示为中文


const readdownload = baseUrl +'front/frontFile/download?fileId='//读取图片

//http://192.167.1.13:13020/front/file/download?fileId
/**
 * 读取图片的请求
 */
function readImageFile (){
	
	let url = '/front/frontFile/read?fileId';
	let baseUrls = baseUrl +url;
	console.log(baseUrls,'图片的地址图片地址图片地址')
	return baseUrls
}
export default {
	readImageUrl:readImageUrl,
	readImageFile:readImageFile,
	readdownload:readdownload,
	language:language
}
