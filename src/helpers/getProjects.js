import { serverUrl } from '../config/config';

export const getProjects = async uid => {
	const url = `${serverUrl}/projects/${uid}/projects`;

	const response = await fetch(url);
	const data = await response.json();

	return data;
};
