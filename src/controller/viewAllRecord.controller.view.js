import path from 'path'

export const viewAllRecord = (req, res) => {
	const pathName = path.resolve(path.dirname(''));
	res.sendFile(pathName + '/public/view/viewAllRecord.html');
};

