const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { api_key } = process.env;

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=live_WieegZGLHwyHTqSdSiRx3TvTfb1gHSHAZkOTHRCTYMLr13SFNkBLeK9uq4Z7K5Nx`
    );
    
    const apiInfo = apiUrl.data.map((el) => {
      // Constructing the full image URL
      const imageUrl = `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`;

      return {
        id: el.id,
        name: el.name,
        height: `${el.height.metric} cm`,
        weight: `${el.weight.metric} kgs`,
        life_span: el.life_span,
        image: imageUrl, // Use the constructed URL here
        temperament: el.temperament,
      };
    });

    return apiInfo;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error;
  }
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament, //brings temeperaments when new breed is created
      attributes: ["name"], // brings name attribute from temperament. Id is give it by default
      through: {
        //attributes table, its needed
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  //Execution of functions.
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal; //brings and array
};

const postNewDog = async (req, res) => {
  let { name, image, height, weight, life_span, createdInDb, temperaments } =
    req.body;

  let dogCreated = await Dog.create({
    //fields for create dog
    name,
    image,
    height,
    weight,
    life_span,
    createdInDb,
  });
  //brings temperament model
  let temperamentDb = await Temperament.findAll({
    where: { name: temperaments }, // finds coincidence on temperament model
  });
  dogCreated.addTemperament(temperamentDb);
  res.send("Wuf! Dog created!!");
};

module.exports = { getAllDogs, postNewDog };
