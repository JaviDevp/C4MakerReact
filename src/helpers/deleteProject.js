export const deleteProject = async id => {
	// const url = `http://localhost:8080/projects/${id}`;
	const url = `https://c4maker-server.herokuapp.com/projects/${id}`;

	const response = await fetch(url, {
		method: 'DELETE',
	});
	const dataResponse = await response.json();

	return dataResponse;
};
