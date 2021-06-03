const path = require("path");

const express = require("express");

const PORT = 3000;

const app = express();

app.use(express.static("../clientApp"));

app.listen(PORT, () => {
	console.log(`server is listening to http requests on port ${PORT}`);
});
