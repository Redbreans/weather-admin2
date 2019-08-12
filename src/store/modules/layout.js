const layout = {
	state: {
		menu: {
			menuData: [],
			firstMenuId: null,
			secondMenuId: null
		}
	},
	mutations: {
		SET_MENU_DATA: (state, menuData) => {
			state.menu.menuData = menuData;
		},
		HEADER_MENU_SELECT: (state, firstMenuId,
			secondMenuId) => {
			state.menu.firstMenuId = firstMenuId;
			state.menu.secondMenuId = secondMenuId;
		}
	},
	actions: {
		setMenuData({
			commit
		}, menuData) {
			commit('SET_MENU_DATA', menuData);
		},
		headerMenuSelect({
				commit
			}, firstMenuId,
			secondMenuId) {
			return new Promise(resolve => {
				commit('HEADER_MENU_SELECT', firstMenuId,
					secondMenuId)
				resolve()
			})
		}
	}
}

export default layout