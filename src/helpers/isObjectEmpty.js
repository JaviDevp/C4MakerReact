export const isObjEmpty = obj => {
	if (obj === undefined) return true;
	for (const prop in obj) {
		const hasProp = Object.prototype.hasOwnProperty.call(obj, prop);
		if (hasProp) return false;
	}
	return true;
};
