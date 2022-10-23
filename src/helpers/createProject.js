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
	// const url = `http://localhost:8080/projects`;
	const url = `https://c4maker-server.herokuapp.com/projects`;
	const data = {
		uid,
		name,
		diagramObject: objetoNuevoDiagrama,
		username,
	};
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const dataResponse = await response.json();
	return dataResponse;
};
