
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		roles : [],
		userInfo: null
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_ROLES: (state, roles) => {
			console.log("SET_ROLES", roles);
			state.roles = roles
		}
	},

	actions: {
		//登录成功
		LoginSuccess({
			commit
		}, userInfo) {
			commit('SET_TOKEN', "admin")
			commit('SET_ROLES', ["admin"])
			//commit('SET_NAME', "admin")
			//commit('SET_AVATAR', "")
		},
		// 登录
		Login({
			commit
		}, userInfo) {
			//const username = userInfo.username.trim()
			
			return new Promise((resolve, reject) => {
				let account = userInfo.username;
				let client = "WEB";
				let password = userInfo.password;
				let verificationCode = "test"; //TODO
				let verificationSession = "test"; //TODO

				platformtalentroomorg.apiPlatformAccountLogin(account, client, password, verificationCode, verificationSession).then(response => {
					console.log(response)
					
					if (response.code != 0) {
						reject(response.msg);
						return;
					}
					const data = response.body;
					let saveUserInfo = {};

					//登录token
					saveUserInfo.token = data.token;
					//用户id
					saveUserInfo.userId = data.userId;
					//昵称
					saveUserInfo.nickname = data.nickname;
					//姓名
					saveUserInfo.name = data.name;
					//登录账号
					saveUserInfo.account = data.account;
					//单位id
					saveUserInfo.unitId = data.unitId;
					//单位类型
					saveUserInfo.unitType = data.unitType;
					//单位名称
					saveUserInfo.unitName = data.unitName;
					//部门id
					saveUserInfo.departmentId = data.departmentId;
					//部门名称
					saveUserInfo.departmentName = data.departmentName;
					//岗位id
					saveUserInfo.postId = data.postId;
					//岗位名称
					saveUserInfo.postName = data.postName;
					//职务id
					saveUserInfo.jobLevel = data.jobLevel;
					//职务名称
					saveUserInfo.jobLevelName = data.jobLevelName;

					setToken(saveUserInfo.token)
					commit('SET_TOKEN', saveUserInfo.token)
					commit('SET_ROLES', ["admin"]) //TODO
					commit('SET_USER_INFO', saveUserInfo)

					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		}
	}
}

export default user