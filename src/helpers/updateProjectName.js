import { serverUrl } from '../config/config';

export const updateProjectName = async (id, name) => {
	const url = `${serverUrl}/projects/${id}/name`;

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
