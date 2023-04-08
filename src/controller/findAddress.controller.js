// app.get('/address/:address', 
 export const findAddress=(req, res)=> {
	const address = req.params.address;
	const addressData = findAddressData(address);
	res.json({
		addressData: addressData
	});
}