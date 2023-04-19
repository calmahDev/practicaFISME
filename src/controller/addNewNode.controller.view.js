import path from 'path'
import os from 'os';


export const addNewNode = (req, res) => {
	const pathName = path.resolve(path.dirname(''));
	res.sendFile(pathName + '/public/view/addNewNode.html');
};

export const ip = (req, res)=> {
    const interfaces = os.networkInterfaces();
    const interfaceName = Object.keys(interfaces).find(name => {
      const iface = interfaces[name];
      return iface.some(({ family, internal }) => family === 'IPv4' && !internal);
    });
    const ipAddress = interfaces[interfaceName].find(({ family, internal }) => family === 'IPv4' && !internal).address;
  
    res.json(`http://${ipAddress}:3333`);
  }