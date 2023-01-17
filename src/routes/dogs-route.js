const { Router } = require("express");
const { getAllDogs, postNewDog } = require("../services/dogs-service");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogsName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogsName.length
      ? res.status(200).send(dogsName)
      : res.send([
          {
            name: "GRRR!!! I cannot find your dog",
            id: "",
            image:
              "https://media.tenor.com/gQ038D6zzZQAAAAM/shiba-inu-oh-no.gif",
            temperaments: "Try to create it!!!",
          },
        ]);
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dogsTotal = await getAllDogs();
  if (id) {
    let dogId = await dogsTotal.filter((el) => el.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("GRRR!! That id was not found");
  }
});

router.post("/", postNewDog);
module.exports = router;
