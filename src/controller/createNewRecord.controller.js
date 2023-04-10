import path from 'path'

export const createNewRecord = (req, res) => {
	const pathName = path.resolve(path.dirname(''));
	res.sendFile(pathName + '/public/view/createNewRecord.html');
};

