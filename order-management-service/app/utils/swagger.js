const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../config/app');

const directoryPath = path.join(__dirname, '../routes/v1');
const pathes = [];
const filesName = fs.readdirSync(directoryPath, (err, files) => {
	// handling error
	if (err) {
		return console.log(`Unable to scan directory: ${err}`);
	}
	// listing all files using forEach
	return files.forEach(file => pathes.push(file));
});

function getFullPathes(names) {
	names.forEach((name) => {
		let customePath;
		if (name !== 'index') {
			customePath = `./app/routes/v1/${name}`;
		}
		if (!(_.isUndefined(name))) {
			pathes.push(customePath);
		}
	});
}
getFullPathes(filesName);

const options = {
	swaggerDefinition: {
        openapi: "3.0.0",
		info: {
			title: 'Order Management Service',
			version: '1.0.0',
			description: 'Microlearning System,REST API with Swagger doc',
			contact: {
				email: 'ravita.kamra@mindtree.com',
			},
        },
        servers: [
            {url: 'http://localhost:8001'}
        ],
		// schemes: ['http'],
		// host: `localhost:${config.app.port}`,
		// basePath: '/api/v1',
	},
	apis: pathes,
};

const swaggerSpec = swaggerJsDoc(options);

router.get('/json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = {
	router
};