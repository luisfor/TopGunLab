module.exports = (app) => {
  const areas = require("../controllers/area");

  let router = require("express").Router();

  //crear nuevas areas
  router.post("/", areas.save);

  //listar todas la reas
  router.get("/", areas.findAll);

  //buscar area por id
  router.get("/:id", areas.findOne);

  //buscar por nombre de area
  router.get("/search/:search", areas.findName);

  //actualizar un area por id y sus parametros
  router.put("/:id", areas.update);

  //eliminar un area por id
  router.delete("/:id", areas.delete);

  //Activate areas
  router.put("/activate/:id", areas.activate);

  //Desactivate areas
  router.put("/desactivate/:id", areas.deactivate);

  app.use("/api/areas", router);
};
