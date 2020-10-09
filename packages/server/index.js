var express = require("express");
var indexRouter = require("./routes/index");

var app = express();
app.use("/", indexRouter);

const port = process.env.port || 9000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
