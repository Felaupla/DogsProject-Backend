const axios = require("axios");
const { Router } = require("express");
const { Temperament } = require("../db");
const { api_key } = process.env;

const router = Router();

const getAllTemperaments = async (req, res) => {
  const temperamentsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${api_key}`
  );
  const temperaments = temperamentsApi.data
    .map((el) => el.temperament)
    .toString();

  //join chains and sepparate by comma
  let dataTemperament = temperaments.split(",");
  //delete blanks on each side
  dataTemperament = dataTemperament.map((el) => el.trim());

  //insert temperaments to dataBase
  dataTemperament.forEach((el) => {
    if (el !== "") {
      Temperament.findOrCreate({
        where: { name: el },
      });
    }
  });

  const allTemperaments = await Temperament.findAll();
  res.status(200).json(allTemperaments);
};

module.exports = { getAllTemperaments };
