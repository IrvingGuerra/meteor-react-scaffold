const SET_USER = 'SET_USER';

export const loginWithPassword = (email, password, response) => async (dispatch) => {
	Meteor.loginWithPassword(email, password, (error) => {
		if (error) {
			response(false);
		}
		const user = Meteor.user();
		dispatch({
			type: SET_USER,
			payload: user,
		});
		response(user.profile.profile);
	});
}

export const logout = () => async (dispatch) => {
	Meteor.logout();
	dispatch({
		type: SET_USER,
		payload: [],
	});
}