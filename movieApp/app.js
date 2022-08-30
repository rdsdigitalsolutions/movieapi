const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const setRoles = require("./migrations/roles");
const setMovies = require("./migrations/movies");

dotenv.config({ path: './.env' });
const app = express();

const corsOptions = { origin: `http://localhost:${process.env.SERVER_PORT}` };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    setRoles( db.role );
    setMovies( db.movie )
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/movie.routes")(app);

app.listen(process.env.SERVER_PORT || 7500, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 7500}.`);
});
