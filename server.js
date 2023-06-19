const express = require("express");
const routes = requie("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
