export const updateProjectName = async (id, name) => {
	// const url = `http://localhost:8080/projects/${id}/name`;
	const url = `https://c4maker-server.herokuapp.com/projects/${id}/name`;

	const data = {
		name,
	};
	const response = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const dataResponse = await response.json();

	return dataResponse;
};
