import { serverUrl } from '../config/config';

export const updateProject = async (id, name, uid, diagramObject, username) => {
	const url = `${serverUrl}/projects/${id}`;

	const data = {
		name,
		diagramObject,
		uid,
		username,
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
