const { authJwt } = require("../middlewares");
const controller = require("../controllers/movie.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/v1/movie", 
    [authJwt.verifyToken], 
    controller.fetch
  );

  // Create
  app.post(
    "/v1/movie", 
    [authJwt.verifyToken], 
    controller.create
  );

  // Remove
  app.delete(
    "/v1/movie/:id", 
    [authJwt.verifyToken], 
    controller.delete
  );

  // Update
  app.put(
    "/v1/movie/:id", 
    [authJwt.verifyToken], 
    controller.update
  );

  // Duplicate
  app.post(
    "/v1/movie/:id", 
    [authJwt.verifyToken], 
    controller.duplicate
  );
};
