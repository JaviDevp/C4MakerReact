import { serverUrl } from '../config/config';

export const getProject = async id => {
	const url = `${serverUrl}/projects/${id}`;

	const response = await fetch(url);
	const data = await response.json();

	return data;
};
