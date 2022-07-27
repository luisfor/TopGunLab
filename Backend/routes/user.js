module.exports = (app) => {
  const user = require("../controller/user");

  let router = require("express").Router();

  //crear nuevas user
  router.post("/", user.save);

  //listar todos los user
  router.get("/", user.findAll);

  //buscar user por id
  router.get("/:id", user.findOne);

  //buscar por nombre del user
  router.get("/search/:search", user.findName);

  //actualizar un user por id y sus parametros
  router.put("/:id", user.update);

  //eliminar un user por id
  router.delete("/:id", user.delete);

  //Activate user
  router.put("/activate/:id", user.activate);

  //Desactivate user
  router.put("/desactivate/:id", user.deactivate);

  app.use("/api/user", router);
};
