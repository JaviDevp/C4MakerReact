export const getProject = async id => {
	// const url = `http://localhost:8080/projects/${id}`;
	const url = `https://c4maker-server.herokuapp.com/projects/${id}`;

	const response = await fetch(url);
	const data = await response.json();

	return data;
};
