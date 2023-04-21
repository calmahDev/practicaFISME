import path from 'path'

export const findRecord = (req, res) => {
	const pathName = path.resolve(path.dirname(''));
	res.sendFile(pathName + '/public/view/findRecord.html');
};

