# Proyecto de Blockchain

Este proyecto es una implementación básica de una blockchain, construida con JavaScript y Node.js.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `estructure.project.py`: archivo de Python que define la estructura de la carpeta del proyecto
- `package.json`: archivo de configuración de npm con las dependencias del proyecto
- `package-lock.json`: archivo generado por npm que controla las versiones exactas de las dependencias instaladas
- `.gitignore`: archivo que especifica los archivos y carpetas que deben ser ignorados por Git
- `public`: carpeta que contiene los archivos públicos de la aplicación
  - `view`: carpeta que contiene las vistas HTML de la aplicación
    - `addNewNode.html`: vista para agregar un nuevo nodo a la red
    - `createNewRecord.html`: vista para crear un nuevo registro en la blockchain
    - `findRecord.html`: vista para buscar un registro en la blockchain
    - `viewAllRecord.html`: vista para ver todos los registros almacenados en la blockchain
- `src`: carpeta que contiene el código fuente de la aplicación
  - `app.js`: archivo que inicia la aplicación Node.js
  - `controller`: carpeta que contiene los controladores de la aplicación
    - `addNewNode.controller.js`: controlador para agregar un nuevo nodo a la red
    - `consensus.controller.js`: controlador para resolver conflictos de blockchain
    - `createNewRecord.controller.js`: controlador para crear un nuevo registro en la blockchain
    - `findRecord.controller.js`: controlador para buscar un registro en la blockchain
    - `mine.controller.js`: controlador para minar un nuevo bloque en la blockchain
    - `reciveNewBlock.controller.js`: controlador para recibir un nuevo bloque de otra cadena de bloques
    - `registerAndBroadcastNode.controller.js`: controlador para registrar y difundir un nuevo nodo en la red
    - `registerNode.controller.js`: controlador para registrar un nuevo nodo en la red
    - `registerNodesBulk.controller.js`: controlador para registrar varios nodos a la vez en la red
    - `transaction.controller.js`: controlador para crear una nueva transacción en la blockchain
    - `transactionBroadcast.controller.js`: controlador para difundir una nueva transacción en la red
    - `viewAllRecord.controller.js`: controlador para ver todos los registros almacenados en la blockchain
  - `model`: carpeta que contiene los modelos de la aplicación
    - `blockGenesis.js`: modelo del bloque génesis de la blockchain
    - `blockchain.js`: modelo de la blockchain
    - `blockchain.routes.js`: modelo de las rutas de la blockchain
    - `chainIsValid.js`: modelo que verifica si una cadena de bloques es válida
    - `createNewBlock.js`: modelo para crear un nuevo bloque en la cadena de bloques
    - `createNewTransaction.js`: modelo para crear una nueva transacción en la cadena de bloques
    - `getLastBlock.js`: modelo para obtener el último bloque de la cadena de bloques
    - `hashBlock.js`: modelo para calcular el hash de un bloque de la cadena de bloques
    - `pendingTransactions.js`: modelo para almacenar las transacciones pendientes en la cadena de bloques
    - `prooOfWork.js`: modelo para calcular la prueba de trabajo necesaria para añadir un nuevo bloque a la cadena de bloques
- `routes`: carpeta que contiene las rutas de la aplicación
    - `blockchain.routes.js`: archivo que define las rutas relacionadas con la cadena de bloques
    - `views.routes.js`: archivo que define las rutas relacionadas con las vistas HTML de la aplicación
- `test`: carpeta que contiene las pruebas automatizadas de la aplicación
    - `createNewBlock.test.js`: prueba para comprobar que se puede crear un nuevo bloque correctamente
- `README.md`: archivo que describe el proyecto y su estructura

## Requisitos

Para ejecutar el proyecto, es necesario tener instalado Node.js en el sistema. Además, se deben instalar las dependencias del proyecto con el siguiente comando:
```bash
npm install
```
## Uso
Este aplicativo no hace uso de un servidor como tal por lo que cada nodo (equipo de computo) tiene una copia exacta de toda la blockchain. A si que primero lanzaremos el primer nodo  y despues los demas. 
### Configurar Primer Nodo
- Dirigete al archivo `package.json`.
  - busca la siguiente linea: `"node1": "nodemon --watch dev -e js src/app.js 3333 http://192.168.0.110:3333"`
  - remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
- Dirigete al archivo `./public/view/addNewNode.html`.
  - Busca la siguiente linea: `fetch('http://192.168.0.110:3333/register-and-broadcast-node', {`
  - Remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
### Configurar otros nodos
- copia el proyecto en el resto de nodos que deseas, ya con los cambios realizado los cambios para el primer nodo.
- Dirigete al archivo `package.json`.
  - busca la siguiente linea: `"node1": "nodemon --watch dev -e js src/app.js 3333 http://192.168.0.110:3333"`
  - remplaza `192.168.0.110` por la IP de tu maquina, por ejemplo `192.168.3.50`
### Inicializa la aplicacione en los nodos
Para iniciar la aplicación, se puede ejecutar el siguiente comando:
```bash
npm run node1
```
### Coneceta los nodos a la red Blockchain
- Una vez levatado inicializado todos los nodos, vamos a ingresar en el navegador a la direccion `http://192.168.0.110:3333/add-new-node`, no olvides cambiar la direccion IP por la tuya. 


Después, se puede acceder a la aplicación en el navegador web a través de la dirección http://localhost:3000. Desde allí, se pueden utilizar las distintas funciones para interactuar con la blockchain.
Contribución

Si deseas contribuir con el proyecto, puedes crear una nueva rama y enviar una solicitud de extracción con tus cambios.
Licencia

Este proyecto está bajo la Licencia MIT.