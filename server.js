const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// set to false once its been put in prod
sequelize.sync({ force: true, logging: console.log }).then(() => {
  app.listen(PORT, () =>
    console.log(`==> 🖥️  Now listening on port ${PORT} 🚀`)
  );
});
