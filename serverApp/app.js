const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");

const visiterRoutes = require("./routes/visiter/index");
const userRoutes = require("./routes/user/index");
const adminRoutes = require("./routes/admin/index");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("../clientApp"));
app.use(visiterRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.listen(PORT, () => {
	console.log(`server is listening to http requests on port ${PORT}`);
});
