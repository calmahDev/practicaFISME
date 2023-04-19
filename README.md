# Proyecto de Blockchain

Este proyecto es una implementación básica de una blockchain, construida con JavaScript y Node.js.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `img`: carperta que contiene las visualiciones las vistas.
  -  `addNewNode.png` : visualicion de la vista addNewNode.hmtl.
  -  `createNewRecord.png` : visualicion de la vista createNewRecord.hmtl.
  -  `findeRecord.png` : visualicion de la vista findeRecord.hmtl.
  -  `index.png` : visualicion de la vista index.hmtl.
  -  `viewAllRecord.png` : visualicion de la vista viewAllRecord.hmtl.
- `public`: carpeta que contiene los archivos públicos de la aplicación.
  - `index.html`: vista por defecto para la bienvenida del usuario.
  - `view`: carpeta que contiene las vistas HTML de la aplicación.
    - `addNewNode.html`: vista para agregar un nuevo nodo a la red.
    - `createNewRecord.html`: vista para crear un nuevo registro en la blockchain.
    - `findRecord.html`: vista para buscar un registro en la blockchain.
    - `viewAllRecord.html`: vista para ver todos los registros almacenados en la blockchain.
- `src`: carpeta que contiene el código fuente de la aplicación.
  - `app.js`: archivo que inicia la aplicación Node.js .
  - `controller`: carpeta que contiene los controladores de la aplicación.
    - `addNewNode.controller.view.js`: controlador para agregar un nuevo nodo a la red.
    - `blockchain.controller.js` : controlador para visualisar toda nuestro blockchain.
    - `consensus.controller.js`: controlador para resolver conflictos de blockchain.
    - `createNewRecord.controller.view.js`: controlador para crear un nuevo registro en la blockchain. 
    - `findRecord.controller.view.js`: controlador para buscar un registro en la blockchain. 
    - `mine.controller.js`: controlador para minar un nuevo bloque en la blockchain.
    - `reciveNewBlock.controller.js`: controlador para recibir un nuevo bloque de otra cadena de bloques. 
    - `registerAndBroadcastNode.controller.js`: controlador para registrar y difundir un nuevo nodo en la red.
    - `registerNode.controller.js`: controlador para registrar un nuevo nodo en la red.
    - `registerNodesBulk.controller.js`: controlador para registrar varios nodos a la vez en la red.
    - `record.controller.js`: controlador para crear una nueva transacción en la blockchain.
    - `recordBroadcast.controller.js`: controlador para difundir una nueva transacción en la red.
    - `viewAllRecord.controller.view.js`: controlador para ver todos los registros almacenados en la blockchain.
  - `model`: carpeta que contiene los modelos de la aplicación.
    - `addRecordToPendingRecord.js` modelo para almacenar las transacciones pendientes en la cadena de bloques.
    - `blockchain.js`: modelo de la blockchain con las variables locales.
    - `blockGenesis.js`: modelo del bloque génesis de la blockchain.
    - `chainIsValid.js`: modelo que verifica si una cadena de bloques es válida.
    - `createNewBlock.js`: modelo para crear un nuevo bloque en la cadena de bloques.
    - `createNewRecord.js`: modelo para crear una nueva transacción en la cadena de bloques.
    - `getLastBlock.js`: modelo para obtener el último bloque de la cadena de bloques.
    - `hashBlock.js`: modelo para calcular el hash de un bloque de la cadena de bloques.
    - `prooOfWork.js`: modelo para calcular la prueba de trabajo necesaria para añadir un nuevo bloque a la cadena de bloques.
    - `server.js` : modelo del servidor para la aplicacion.
- `routes`: carpeta que contiene las rutas para el server.
    - `blockchain.routes.js`: archivo que define las rutas relacionadas con la cadena de bloques.
    - `views.routes.js`: archivo que define las rutas relacionadas con las vistas HTML de la aplicación.
- `test`: carpeta que contiene las pruebas unitarias de la aplicación.
    - `addRecordToPendingRecord.test.js:` Prueba para comprobar que se puede agregar una transacción a las transacciones pendientes correctamente.
    - `chainIsValid.test.js:` Prueba para comprobar que la cadena de bloques es válida y no ha sido alterada.
    - `createNewBlock.test.js:` Prueba para comprobar que se puede crear un nuevo bloque correctamente.
    - `getLastBlock.test.js:` Prueba para comprobar que se puede obtener el último bloque de la cadena correctamente.
    - `hashBlock.test.js:` Prueba para comprobar que se puede calcular el hash de un bloque correctamente.
    - `proofOfWork.test.js:` Prueba para comprobar que se puede generar la prueba de trabajo de un bloque correctamente.
- `package.json`: archivo de configuración de npm con las dependencias del proyecto.
- `.gitignore`: archivo que especifica los archivos y carpetas que deben ser ignorados por Git.
- `README.md`: archivo que describe el proyecto y su estructura.

## Requisitos
- No tener instalado VMware al momento de agregar el nodo a la red.
- Tener conexion a red y a internet.
- tener node.js 18 en adelante.
- Tener instalado Visual Studio Code.
- Tener intalado la extension Draw.io Integration.


## IMPLEMENTACION
Este aplicativo no hace uso de un servidor como tal por lo que cada nodo (equipo de computo) tiene una copia exacta de toda la blockchain. A si que primero lanzaremos el primer nodo  y despues los demas. 
### instalar las dependencias del proyecto :
```bash
npm install
```
### Configurar Primer Nodo :
- Dirigete al archivo `package.json`.
  - busca la siguiente linea: `"node1": "nodemon --watch dev -e js src/app.js 3333 http://192.168.0.110:3333"`
  - remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
- Dirigete al archivo `./public/view/addNewNode.html`.
  - Busca la siguiente linea: `fetch('http://192.168.0.110:3333/register-and-broadcast-node', {`
  - Remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
### Configurar otros nodos : 
- copia el proyecto en el resto de nodos que deseas, ya con los cambios realizado los cambios para el primer nodo.
- Dirigete al archivo `package.json`.
  - busca la siguiente linea: `"node1": "nodemon --watch dev -e js src/app.js 3333 http://192.168.0.110:3333"`
  - remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
### Inicializa  los nodos :
Para iniciar la aplicación, se puede ejecutar el siguiente comando:
```bash
npm run node1
```
### Coneceta otro nodo a la red Blockchain : 
- En el nodo que vas agregar a la red, vamos a ingresar en el navegador a la direccion `http://192.168.0.110:3333` ( no olvides cambiar la direccion IP por la tuya). Deberas tener esta vista:
![Vista de bienvenida](/img/index.png)
- Has clic en ingresar, te llevara a `http://192.168.0.110:3333/add-new-node` ( no olvides cambiar la direccion IP por la tuya). Deberas tener esta vista:
![Vista para agregar otro nodo a la red](/img/addNewNode.png)
- Copia la direccion sin las comillas que te aparece en pantalla.
- Pedalo en el cadro inferior .
- Dale Clic a registrar.
<center>Felicidades ya lograste implemtar la red blockchain y sus utilidades, ahora puedes agregar los nodos que  desees solo haciendo los pasos: `Configurar otros nodos` y `Coneceta otro nodo a la red Blockchain` </center>
 
## USO

### Crear nuevo certificado : 
- Para crear un nuevo certificado dirigete a `http://192.168.0.110:3333/create-new-record` ( no olvides cambiar la direccion IP por la tuya).  Deberas tener esta vista:
![Vista pare crear nuevo certificado](/img/createNewRecord.png)
- Rellena los espacios en blanco.
- Clic en crear certificado.

`Nota:` en la parte inferiror se cargan las ultimos 5 certificados emitidos y registrados en la blockchain.
### Buscar certficado : 
- Para buscar certificado dirigete a `http://192.168.0.110:3333/find-record` ( no olvides cambiar la direccion IP por la tuya).  Deberas tener esta vista:
![Vista para buscar certificad](/img/findRecord.png)
- Ingresa una palabra clave para tu busqueda y da clic en buscar.
- Podras visualizar todo los certificado relacionados con tu busqueda.

### Ver todos los certificados : 
- Para ver todos los  certificados dirigete a `http://192.168.0.110:3333/view-all-record` ( no olvides cambiar la direccion IP por la tuya).  Deberas tener esta vista:
![Vista par ver todos los certificados](/img/viewAllRecord.png)
- Los certificados van a mostrar de 2 en 2, para poder ver certificados anteriores tienes que dar clic en boton de `cargar` `mas`.