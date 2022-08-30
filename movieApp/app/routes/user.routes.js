const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Test public access.
  app.get("/v1", controller.allAccess);

  // Test access as user.
  app.get("/v1/user", [authJwt.verifyToken], controller.userBoard);

  // Test access as moderator.
  app.get(
    "/v1/moderator",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Test access as admin.
  app.get(
    "/v1/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
