import request from '@/utils/request'	
	
	
	
	
/**	
 * 详情	
 * @param {Object} senseId 广告位ID	
 */	
export function apiAdminAdvertInfo(senseId) {	
	
	return request({	
		url: '/admin/advert/info',	
		method: 'post',	
		data: {	
	
			senseId	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} position 广告位置 ，根据各系统自定义类型确定	
 * @param {Object} size 获取条数	
 * @param {Object} start 起始位置	
 */	
export function apiAdminAdvertList(position, size, start) {	
	
	return request({	
		url: '/admin/advert/list',	
		method: 'post',	
		data: {	
	
			position,	
			size,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * html	
 */	
export function apiAdminFilingInformationHtml() {	
	
	return request({	
		url: '/admin/filingInformation/html',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 详细	
 * @param {Object} articleId 文章id	
 * @param {Object} queryCode 分类查询编码（当编码只有一篇文章时使用）	
 */	
export function apiAdminFilingInformationInfo(articleId, queryCode) {	
	
	return request({	
		url: '/admin/filingInformation/info',	
		method: 'post',	
		data: {	
	
			articleId,	
			queryCode	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} createTimeBegin 创建时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} createTimeEnd 开始时间，结束;格式：2018-10-01 10:25:32	
 * @param {Object} size 获取数量	
 * @param {Object} sortField 排序字段(默认根据创建时间排序):create_time，update_time，sort_order	
 * @param {Object} sortType 排序方式:ASC(升序)，DESC(降序)	
 * @param {Object} start 起始位置	
 * @param {Object} state 状态	
 * @param {Object} title 根据标题搜索	
 * @param {Object} typeCode 顶级分类查询编码	
 * @param {Object} typeId 分类id	
 * @param {Object} updateTimeBegin 更新时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} updateTimeEnd 更新时间，结束;格式：2018-10-01 10:25:32	
 */	
export function apiAdminFilingInformationList(createTimeBegin, createTimeEnd, size, sortField, sortType, start, state, title, typeCode, typeId, updateTimeBegin, updateTimeEnd) {	
	
	return request({	
		url: '/admin/filingInformation/list',	
		method: 'post',	
		data: {	
	
			createTimeBegin,	
			createTimeEnd,	
			size,	
			sortField,	
			sortType,	
			start,	
			state,	
			title,	
			typeCode,	
			typeId,	
			updateTimeBegin,	
			updateTimeEnd	
		}	
	
	});	
}	
	
	
/**	
 * mobileHtml	
 */	
export function apiAdminFilingInformationMobileHtml() {	
	
	return request({	
		url: '/admin/filingInformation/mobileHtml',	
		method: 'post'	
	});	
}	
	
	
/**	
 * html	
 */	
export function apiAdminMeteorologyAndTravelIntroHtml() {	
	
	return request({	
		url: '/admin/meteorologyAndTravelIntro/html',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 详细	
 * @param {Object} articleId 文章id	
 * @param {Object} queryCode 分类查询编码（当编码只有一篇文章时使用）	
 */	
export function apiAdminMeteorologyAndTravelIntroInfo(articleId, queryCode) {	
	
	return request({	
		url: '/admin/meteorologyAndTravelIntro/info',	
		method: 'post',	
		data: {	
	
			articleId,	
			queryCode	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} createTimeBegin 创建时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} createTimeEnd 开始时间，结束;格式：2018-10-01 10:25:32	
 * @param {Object} size 获取数量	
 * @param {Object} sortField 排序字段(默认根据创建时间排序):create_time，update_time，sort_order	
 * @param {Object} sortType 排序方式:ASC(升序)，DESC(降序)	
 * @param {Object} start 起始位置	
 * @param {Object} state 状态	
 * @param {Object} title 根据标题搜索	
 * @param {Object} typeCode 顶级分类查询编码	
 * @param {Object} typeId 分类id	
 * @param {Object} updateTimeBegin 更新时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} updateTimeEnd 更新时间，结束;格式：2018-10-01 10:25:32	
 */	
export function apiAdminMeteorologyAndTravelIntroList(createTimeBegin, createTimeEnd, size, sortField, sortType, start, state, title, typeCode, typeId, updateTimeBegin, updateTimeEnd) {	
	
	return request({	
		url: '/admin/meteorologyAndTravelIntro/list',	
		method: 'post',	
		data: {	
	
			createTimeBegin,	
			createTimeEnd,	
			size,	
			sortField,	
			sortType,	
			start,	
			state,	
			title,	
			typeCode,	
			typeId,	
			updateTimeBegin,	
			updateTimeEnd	
		}	
	
	});	
}	
	
	
/**	
 * mobileHtml	
 */	
export function apiAdminMeteorologyAndTravelIntroMobileHtml() {	
	
	return request({	
		url: '/admin/meteorologyAndTravelIntro/mobileHtml',	
		method: 'post'	
	});	
}	
	
	
/**	
 * html	
 */	
export function apiAdminRouterRecommendationHtml() {	
	
	return request({	
		url: '/admin/routerRecommendation/html',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 详细	
 * @param {Object} articleId 文章id	
 * @param {Object} queryCode 分类查询编码（当编码只有一篇文章时使用）	
 */	
export function apiAdminRouterRecommendationInfo(articleId, queryCode) {	
	
	return request({	
		url: '/admin/routerRecommendation/info',	
		method: 'post',	
		data: {	
	
			articleId,	
			queryCode	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} createTimeBegin 创建时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} createTimeEnd 开始时间，结束;格式：2018-10-01 10:25:32	
 * @param {Object} size 获取数量	
 * @param {Object} sortField 排序字段(默认根据创建时间排序):create_time，update_time，sort_order	
 * @param {Object} sortType 排序方式:ASC(升序)，DESC(降序)	
 * @param {Object} start 起始位置	
 * @param {Object} state 状态	
 * @param {Object} title 根据标题搜索	
 * @param {Object} typeCode 顶级分类查询编码	
 * @param {Object} typeId 分类id	
 * @param {Object} updateTimeBegin 更新时间，开始;格式：2018-10-01 10:25:32	
 * @param {Object} updateTimeEnd 更新时间，结束;格式：2018-10-01 10:25:32	
 */	
export function apiAdminRouterRecommendationList(createTimeBegin, createTimeEnd, size, sortField, sortType, start, state, title, typeCode, typeId, updateTimeBegin, updateTimeEnd) {	
	
	return request({	
		url: '/admin/routerRecommendation/list',	
		method: 'post',	
		data: {	
	
			createTimeBegin,	
			createTimeEnd,	
			size,	
			sortField,	
			sortType,	
			start,	
			state,	
			title,	
			typeCode,	
			typeId,	
			updateTimeBegin,	
			updateTimeEnd	
		}	
	
	});	
}	
	
	
/**	
 * mobileHtml	
 */	
export function apiAdminRouterRecommendationMobileHtml() {	
	
	return request({	
		url: '/admin/routerRecommendation/mobileHtml',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 获取accessToken包括openid	
 * @param {Object} code 授权code	
 */	
export function apiFrontMemberWxGzhGetAccessToken(code) {	
	
	return request({	
		url: '/front/MemberWxGzh/getAccessToken',	
		method: 'post',	
		data: {	
	
			code	
		}	
	
	});	
}	
	
	
/**	
 * 获取授权code，地址会重定向	
 */	
export function apiFrontMemberWxGzhGetCodeUrl() {	
	
	return request({	
		url: '/front/MemberWxGzh/getCodeUrl',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 拉取用户信息(需scope为 snsapi_userinfo)	
 * @param {Object} accesstoken accesstoken	
 * @param {Object} openid openid	
 */	
export function apiFrontMemberWxGzhGetUserInfo(accesstoken, openid) {	
	
	return request({	
		url: '/front/MemberWxGzh/getUserInfo',	
		method: 'post',	
		data: {	
	
			accesstoken,	
			openid	
		}	
	
	});	
}	
	
	
/**	
 * 刷新accessToken包括openid	
 * @param {Object} refreshToken 填写为refresh_token	
 */	
export function apiFrontMemberWxGzhRefreshAccessToken(refreshToken) {	
	
	return request({	
		url: '/front/MemberWxGzh/refreshAccessToken',	
		method: 'post',	
		data: {	
	
			refreshToken	
		}	
	
	});	
}	
	
	
/**	
 * 详情	
 */	
export function apiFrontPlatformConfigInfo() {	
	
	return request({	
		url: '/front/PlatformConfig/info',	
		method: 'post'	
	});	
}	
	
	
/**	
 * html	
 */	
export function apiFrontAboutUsCmsArticleHtml() {	
	
	return request({	
		url: '/front/aboutUsCmsArticle/html',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 详细	
 * @param {Object} articleId 文章id	
 * @param {Object} queryCode 分类查询编码（当编码只有一篇文章时使用）	
 */	
export function apiFrontAboutUsCmsArticleInfo(articleId, queryCode) {	
	
	return request({	
		url: '/front/aboutUsCmsArticle/info',	
		method: 'post',	
		data: {	
	
			articleId,	
			queryCode	
		}	
	
	});	
}	
	
	
/**	
 * 相册详情	
 * @param {Object} albumId id	
 */	
export function apiFrontAlbumInfo(albumId) {	
	
	return request({	
		url: '/front/album/info',	
		method: 'post',	
		data: {	
	
			albumId	
		}	
	
	});	
}	
	
	
/**	
 * 相册列表	
 * @param {Object} parentId 父节点Id	
 */	
export function apiFrontAlbumList(parentId) {	
	
	return request({	
		url: '/front/album/list',	
		method: 'post',	
		data: {	
	
			parentId	
		}	
	
	});	
}	
	
	
/**	
 * 相册详情(根据分类及目标id获取详情)	
 * @param {Object} targetId 目标id	
 * @param {Object} targetType 目标类型: scenicArea:景区;meteorology:景观;travel:特色旅游	
 */	
export function apiFrontAlbumTargetInfo(targetId, targetType) {	
	
	return request({	
		url: '/front/album/targetInfo',	
		method: 'post',	
		data: {	
	
			targetId,	
			targetType	
		}	
	
	});	
}	
	
	
/**	
 * 图片详情	
 * @param {Object} albumImageId id	
 */	
export function apiFrontAlbumImageInfo(albumImageId) {	
	
	return request({	
		url: '/front/albumImage/info',	
		method: 'post',	
		data: {	
	
			albumImageId	
		}	
	
	});	
}	
	
	
/**	
 * 图片列表	
 * @param {Object} albumId 相册id	
 */	
export function apiFrontAlbumImageList(albumId) {	
	
	return request({	
		url: '/front/albumImage/list',	
		method: 'post',	
		data: {	
	
			albumId	
		}	
	
	});	
}	
	
	
/**	
 * 新增	
 * @param {Object} content 内容	
 * @param {Object} group 评论类型;景区；meteorology：景观；travel：特色旅游	
 * @param {Object} isShow 是否展示；1：是，0：否	
 * @param {Object} parentId 父节点id(该评论所有的回复评论)	
 * @param {Object} targetId 目标id	
 * @param {Object} userHeadImage 用户头像	
 * @param {Object} userName 用户昵称	
 * @param {Object} userToken 用户token	
 */	
export function apiFrontCommentAdd(content, group, isShow, parentId, targetId, userHeadImage, userName, userToken) {	
	
	return request({	
		url: '/front/comment/add',	
		method: 'post',	
		data: {	
	
			content,	
			group,	
			isShow,	
			parentId,	
			targetId,	
			userHeadImage,	
			userName,	
			userToken	
		}	
	
	});	
}	
	
	
/**	
 * 详情	
 * @param {Object} commentId id	
 */	
export function apiFrontCommentInfo(commentId) {	
	
	return request({	
		url: '/front/comment/info',	
		method: 'post',	
		data: {	
	
			commentId	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} group 评论类型;meteorology：景观；travel：特色旅游	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 */	
export function apiFrontCommentList(group, size, start, targetId) {	
	
	return request({	
		url: '/front/comment/list',	
		method: 'post',	
		data: {	
	
			group,	
			size,	
			start,	
			targetId	
		}	
	
	});	
}	
	
	
/**	
 * 获取时间详情	
 */	
export function apiFrontDateTimeInfo() {	
	
	return request({	
		url: '/front/dateTime/info',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 下载文件	
 */	
export function apiFrontFileDownload() {	
	
	return request({	
		url: '/front/file/download',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 读文件	
 */	
export function apiFrontFileRead() {	
	
	return request({	
		url: '/front/file/read',	
		method: 'post'	
	});	
}	
	
	
/**	
 * ueditorExec	
 */	
export function apiFrontFileUeditorExec() {	
	
	return request({	
		url: '/front/file/ueditorExec',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 上传文件, 需要已表单方式携带参数：pos ： Online 文件存在网厅,Dasp：文件存在审批平台；Source：事项实例 MatterOa, 事项配置 Matter,其他 Other	
 */	
export function apiFrontFileUpload() {	
	
	return request({	
		url: '/front/file/upload',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 上传文件(UEditor), 需要已表单方式携带参数：pos ： Online 文件存在网厅；Dasp：文件存在审批平台；Source：事项实例 MatterOa, 事项配置 Matter,其他 Other	
 */	
export function apiFrontFileUploadUeditor() {	
	
	return request({	
		url: '/front/file/uploadUeditor',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 友情链接列表	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 */	
export function apiFrontLinkList(size, start) {	
	
	return request({	
		url: '/front/link/list',	
		method: 'post',	
		data: {	
	
			size,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * 详情	
 * @param {Object} meAutoWarningLiveId id,	
 */	
export function apiFrontMeAutoWarningLiveInfo(meAutoWarningLiveId) {	
	
	return request({	
		url: '/front/meAutoWarningLive/info',	
		method: 'post',	
		data: {	
	
			meAutoWarningLiveId	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 * @param {Object} targetType 目标类型;road:道路;scenicArea:景区	
 */	
export function apiFrontMeAutoWarningLiveList(size, start, targetId, targetType) {	
	
	return request({	
		url: '/front/meAutoWarningLive/list',	
		method: 'post',	
		data: {	
	
			size,	
			start,	
			targetId,	
			targetType	
		}	
	
	});	
}	
	
	
/**	
 * 详情	
 * @param {Object} meDangerId id	
 */	
export function apiFrontMeDangerInfo(meDangerId) {	
	
	return request({	
		url: '/front/meDanger/info',	
		method: 'post',	
		data: {	
	
			meDangerId	
		}	
	
	});	
}	
	
	
/**	
 * 列表	
 * @param {Object} meDangerClassId 类型id	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 * @param {Object} type 地区类型;scenicArea:景区;road:道路	
 */	
export function apiFrontMeDangerList(meDangerClassId, size, start, targetId, type) {	
	
	return request({	
		url: '/front/meDanger/list',	
		method: 'post',	
		data: {	
	
			meDangerClassId,	
			size,	
			start,	
			targetId,	
			type	
		}	
	
	});	
}	
	
	
/**	
 * 天气实况详情	
 * @param {Object} targetId 目标id	
 * @param {Object} targetType 目标类型:scenicArea：景区；scenic：景点；road：道路	
 */	
export function apiFrontMeLiveInfo(targetId, targetType) {	
	
	return request({	
		url: '/front/meLive/info',	
		method: 'post',	
		data: {	
	
			targetId,	
			targetType	
		}	
	
	});	
}	
	
	
/**	
 * 7天气预报列表	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 * @param {Object} targetType 目标类型: scenicArea：景区；scenic：景点；road：道路	
 */	
export function apiFrontMePredictionList(size, start, targetId, targetType) {	
	
	return request({	
		url: '/front/mePrediction/list',	
		method: 'post',	
		data: {	
	
			size,	
			start,	
			targetId,	
			targetType	
		}	
	
	});	
}	
	
	
/**	
 * 当天天气预报列表	
 * @param {Object} targetId 目标id	
 * @param {Object} targetType 目标类型: scenicArea：景区；road：道路	
 */	
export function apiFrontMePredictionNowList(targetId, targetType) {	
	
	return request({	
		url: '/front/mePrediction/nowList',	
		method: 'post',	
		data: {	
	
			targetId,	
			targetType	
		}	
	
	});	
}	
	
	
/**	
 * 手动预警详情	
 * @param {Object} meWarningId id	
 */	
export function apiFrontMeWarningInfo(meWarningId) {	
	
	return request({	
		url: '/front/meWarning/info',	
		method: 'post',	
		data: {	
	
			meWarningId	
		}	
	
	});	
}	
	
	
/**	
 * 手动预警列表	
 */	
export function apiFrontMeWarningList() {	
	
	return request({	
		url: '/front/meWarning/list',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 通知列表	
 * @param {Object} isShow 是否显示,1:是;0:否	
 * @param {Object} showType 展示类型,textInfo：普通文本;warningInfo:预警信息	
 * @param {Object} type 通知类型,show：纯展示；fileDownload：文件下载	
 */	
export function apiFrontNoticeList(isShow, showType, type) {	
	
	return request({	
		url: '/front/notice/list',	
		method: 'post',	
		data: {	
	
			isShow,	
			showType,	
			type	
		}	
	
	});	
}	
	
	
/**	
 * 景区详情	
 * @param {Object} scenicAreaId 景区id	
 */	
export function apiFrontScenicAreaInfo(scenicAreaId) {	
	
	return request({	
		url: '/front/scenicArea/info',	
		method: 'post',	
		data: {	
	
			scenicAreaId	
		}	
	
	});	
}	
	
	
/**	
 * 景区评级列表	
 * @param {Object} isHomeShow 是否首页显示；1：是；0：否	
 */	
export function apiFrontScenicAreaLevelList(isHomeShow) {	
	
	return request({	
		url: '/front/scenicArea/levelList',	
		method: 'post',	
		data: {	
	
			isHomeShow	
		}	
	
	});	
}	
	
	
/**	
 * 景区列表	
 * @param {Object} scenicAreaId 景区评级id	
 * @param {Object} size 数量	
 * @param {Object} sortField 排序字段	
 * @param {Object} sortType 排序类型	
 * @param {Object} start 开始位置	
 */	
export function apiFrontScenicAreaList(scenicAreaId, size, sortField, sortType, start) {	
	
	return request({	
		url: '/front/scenicArea/list',	
		method: 'post',	
		data: {	
	
			scenicAreaId,	
			size,	
			sortField,	
			sortType,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * 景区详情	
 * @param {Object} lat 纬度	
 * @param {Object} lon 经度	
 */	
export function apiFrontScenicAreaSelectByScenicArea(lat, lon) {	
	
	return request({	
		url: '/front/scenicArea/selectByScenicArea',	
		method: 'post',	
		data: {	
	
			lat,	
			lon	
		}	
	
	});	
}	
	
	
/**	
 * 景点分类详情	
 * @param {Object} scenicClassId 景区分类id	
 */	
export function apiFrontScenicClassInfo(scenicClassId) {	
	
	return request({	
		url: '/front/scenicClass/info',	
		method: 'post',	
		data: {	
	
			scenicClassId	
		}	
	
	});	
}	
	
	
/**	
 * 景点分类列表	
 * @param {Object} group 分组,meteorology:气象景观;travel:特色旅游	
 * @param {Object} isHomeShow 是否首页显示;1:是;不传为全部显示	
 */	
export function apiFrontScenicClassList(group, isHomeShow) {	
	
	return request({	
		url: '/front/scenicClass/list',	
		method: 'post',	
		data: {	
	
			group,	
			isHomeShow	
		}	
	
	});	
}	
	
	
/**	
 * 详情	
 * @param {Object} scenicIndexId id	
 */	
export function apiFrontScenicIndexInfo(scenicIndexId) {	
	
	return request({	
		url: '/front/scenicIndex/info',	
		method: 'post',	
		data: {	
	
			scenicIndexId	
		}	
	
	});	
}	
	
	
/**	
 * 实况列表	
 * @param {Object} group 分组;life:生活；travel：旅游；traffic：交通	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 * @param {Object} type 类型:road:道路；scenicArea：景区	
 */	
export function apiFrontScenicIndexList(group, size, start, targetId, type) {	
	
	return request({	
		url: '/front/scenicIndex/list',	
		method: 'post',	
		data: {	
	
			group,	
			size,	
			start,	
			targetId,	
			type	
		}	
	
	});	
}	
	
	
/**	
 * 7天列表	
 * @param {Object} group 分组;life:生活；travel：旅游；traffic：交通	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 * @param {Object} targetId 目标id	
 * @param {Object} type 类型:road:道路；scenicArea：景区	
 */	
export function apiFrontScenicIndexPredictionlist(group, size, start, targetId, type) {	
	
	return request({	
		url: '/front/scenicIndex/predictionlist',	
		method: 'post',	
		data: {	
	
			group,	
			size,	
			start,	
			targetId,	
			type	
		}	
	
	});	
}	
	
	
/**	
 * 地图列表	
 */	
export function apiFrontScenicMapListAll() {	
	
	return request({	
		url: '/front/scenicMap/listAll',	
		method: 'post'	
	});	
}	
	
	
/**	
 * 景点详情	
 * @param {Object} scenicPointId id	
 */	
export function apiFrontScenicPointInfo(scenicPointId) {	
	
	return request({	
		url: '/front/scenicPoint/info',	
		method: 'post',	
		data: {	
	
			scenicPointId	
		}	
	
	});	
}	
	
	
/**	
 * 景点列表	
 * @param {Object} group 分组: meteorology:气象景观;travel:特色旅游	
 * @param {Object} scenicClassId 分类id	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 */	
export function apiFrontScenicPointList(group, scenicClassId, size, start) {	
	
	return request({	
		url: '/front/scenicPoint/list',	
		method: 'post',	
		data: {	
	
			group,	
			scenicClassId,	
			size,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * 景点推荐详情	
 * @param {Object} scenicRecommendId id	
 */	
export function apiFrontScenicPointRecommendInfo(scenicRecommendId) {	
	
	return request({	
		url: '/front/scenicPoint/recommendInfo',	
		method: 'post',	
		data: {	
	
			scenicRecommendId	
		}	
	
	});	
}	
	
	
/**	
 * 景点推荐	
 * @param {Object} group 分组: meteorology:气象景观;travel:特色旅游	
 * @param {Object} size 数量	
 * @param {Object} start 开始位置	
 */	
export function apiFrontScenicPointRecommendList(group, size, start) {	
	
	return request({	
		url: '/front/scenicPoint/recommendList',	
		method: 'post',	
		data: {	
	
			group,	
			size,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * 添加	
 * @param {Object} name 敏感词	
 */	
export function apiFrontSensitiveWordsAdd(name) {	
	
	return request({	
		url: '/front/sensitiveWords/add',	
		method: 'post',	
		data: {	
	
			name	
		}	
	
	});	
}	
	
	
/**	
 * 删除	
 * @param {Object} wordIdList 敏感词id	
 */	
export function apiFrontSensitiveWordsDelete(wordIdList) {	
	
	return request({	
		url: '/front/sensitiveWords/delete',	
		method: 'post',	
		data: {	
	
			wordIdList	
		}	
	
	});	
}	
	
	
/**	
 * 查找敏感词	
 * @param {Object} orgStr 检查字符串	
 */	
export function apiFrontSensitiveWordsFind(orgStr) {	
	
	return request({	
		url: '/front/sensitiveWords/find',	
		method: 'post',	
		data: {	
	
			orgStr	
		}	
	
	});	
}	
	
	
/**	
 * 查找敏感词(批量)	
 * @param {Object} orgStrList 检查字符串	
 */	
export function apiFrontSensitiveWordsFindBatch(orgStrList) {	
	
	return request({	
		url: '/front/sensitiveWords/findBatch',	
		method: 'post',	
		data: {	
	
			orgStrList	
		}	
	
	});	
}	
	
	
/**	
 * 列表（分页）	
 * @param {Object} name 敏感词	
 * @param {Object} size 条数	
 * @param {Object} sortField 排序字段	
 * @param {Object} sortType 排序方式，ASC/DESC	
 * @param {Object} start 开始位置	
 */	
export function apiFrontSensitiveWordsPage(name, size, sortField, sortType, start) {	
	
	return request({	
		url: '/front/sensitiveWords/page',	
		method: 'post',	
		data: {	
	
			name,	
			size,	
			sortField,	
			sortType,	
			start	
		}	
	
	});	
}	
	
	
/**	
 * 道路详情	
 * @param {Object} scenicRadId 道路id	
 */	
export function apiFrontTrafficInfo(scenicRadId) {	
	
	return request({	
		url: '/front/traffic/info',	
		method: 'post',	
		data: {	
	
			scenicRadId	
		}	
	
	});	
}	
	
	
/**	
 * 道路列表	
 * @param {Object} sortField 排序字段	
 * @param {Object} sortType 排序类型	
 */	
export function apiFrontTrafficList(sortField, sortType) {	
	
	return request({	
		url: '/front/traffic/list',	
		method: 'post',	
		data: {	
	
			sortField,	
			sortType	
		}	
	
	});	
}	
	
	
