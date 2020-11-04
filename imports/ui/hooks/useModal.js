import { useState } from 'react';

const useModal = () => {
	const [state, setSate] = useState({
		show: false,
		title: 'Title',
		description: 'Description'
	});
	const toggle = () => {
		setSate({ ...state, show: !state.show });
	};
	const setModal = (title, description) => {
		setSate({
			show: true,
			title,
			description,
		});
	};
	return {
		state,
		toggle,
		setModal
	};
};

export default useModal;
