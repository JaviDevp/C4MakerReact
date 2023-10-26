import { serverUrl } from '../config/config';

const objetoNuevoDiagrama = {
	nodes: [],
	edges: [],
	viewport: {
		x: 0,
		y: 0,
		zoom: 1,
	},
};

export const createProject = async (
	name = 'nuevo diagrama',
	uid,
	diagramObject = '',
	username
) => {
	console.log('creating');
	const url = `${serverUrl}/projects`;
	// const url = `https://c4maker-server.herokuapp.com/projects`;
	const data = {
		uid,
		name,
		diagramObject: objetoNuevoDiagrama,
		username,
	};
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const dataResponse = await response.json();
		console.log(dataResponse);
		return dataResponse;
	} catch (error) {
		// console.log(error);
	}
};
