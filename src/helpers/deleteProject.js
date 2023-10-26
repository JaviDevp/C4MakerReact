import { serverUrl } from '../config/config';

export const deleteProject = async id => {
	const url = `${serverUrl}/projects/${id}`;

	const response = await fetch(url, {
		method: 'DELETE',
	});
	const dataResponse = await response.json();

	return dataResponse;
};
