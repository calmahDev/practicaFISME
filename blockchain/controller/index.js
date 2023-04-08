// se puede iniciar el servidor de Express y escuchar en el puerto correspondiente

// index.js
const {app} = require('./server');
require('./routes');

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});



