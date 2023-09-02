export const pxToRem = (px: number): string => `${px / 16}rem`;
export const hexToRgbA = (hex: string, alpha = "1"): string => {
	const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));

	return `rgba(${r},${g},${b},${alpha})`;
};

export const makeId = (length: number) => {
	let result = "";
	const characters = "0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
