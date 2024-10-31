import { omitBy } from 'lodash';

export const newId = async () => {
	const timestamp = new Date().getTime();
	const randomNum = Math.floor(Math.random() * 10000);
	return `mail_${timestamp}_${randomNum}`;
};
export const removeNullish = <T extends Record<string, any>>(
	originalObject: T,
): T => {
	return omitBy(originalObject, (value) => {
		return value === null || value === '' || value === undefined || value === 'undefined';
	}) as T;
};
