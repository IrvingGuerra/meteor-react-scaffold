const SET_USER = 'SET_USER';

export const loginWithPassword = (email, password, response) => async (dispatch) => {
	Meteor.loginWithPassword(email, password, (error) => {
		if (error) {
			response(false);
			return;
		}
		const user = Meteor.user();
		dispatch({
			type: SET_USER,
			payload: user,
		});
		response(user.profile.profile);
	});
}

export const forgotPassword = (email, response) => async () => {
	Accounts.forgotPassword({ email }, (error) => {
		if (error) {
			response(false);
			return;
		}
		response(true);
	});
}

export const resetPassword = (token, password, response) => async () => {
	Accounts.resetPassword(token, password,(error) => {
		if (error) {
			response(false);
			return;
		}
		response(true);
	});
}


export const logout = () => async (dispatch) => {
	Meteor.logout();
	dispatch({
		type: SET_USER,
		payload: [],
	});
}