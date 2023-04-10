import path from 'path'

export const findBlock = (req, res) => {
	const pathName = path.resolve(path.dirname(''));
	res.sendFile(pathName + '/public/view/findRecord.html');
};

