const express = require("express");
const app = express();
const expressFormidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const cryptoJS = require("crypto-js");

app.use(expressFormidable());

app.use(cors());

app.post("/characters", async (req, res) => {
  try {
    const limit = 100;
    let date = Date.now();
    let dateToString = date.toString();
    let offset = (req.fields.page - 1) * 100;

    let hash = cryptoJS.MD5(
      dateToString +
        "68fb7d0345cebbd7a50d939b98a1fc73ec09aa5d5eb06c633abf5b6af2ae198fb59ca054"
    );
    console.log(dateToString);

    //let offset = req.query.page;

    let characters = await axios.get(
      "http://gateway.marvel.com/v1/public/characters?offset=" +
        offset +
        "&limit=" +
        limit +
        "&ts=" +
        dateToString +
        "&apikey=5eb06c633abf5b6af2ae198fb59ca054&hash=" +
        hash
    );
    //console.log(characters.data.data.results);
    console.log("page====>" + req.fields.page);
    res.json(characters.data.data.results);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/returnComicInfo", async (req, res) => {
  try {
    let date = Date.now();
    let dateToString = date.toString();
    //console.log(req.fields.url);

    let hash = cryptoJS.MD5(
      dateToString +
        "68fb7d0345cebbd7a50d939b98a1fc73ec09aa5d5eb06c633abf5b6af2ae198fb59ca054"
    );
    const comic = await axios.get(
      "http://gateway.marvel.com/v1/public/characters/" +
        req.fields.id +
        "/comics" +
        "?ts=" +
        dateToString +
        "&apikey=5eb06c633abf5b6af2ae198fb59ca054&hash=" +
        hash
    );
    console.log(comic.data);
    res.json(comic.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getComics", async (req, res) => {
  try {
    const limit = 100;
    let date = Date.now();
    let dateToString = date.toString();

    let offset = (req.fields.page - 1) * 100;

    //console.log(req.fields.url);

    let hash = cryptoJS.MD5(
      dateToString +
        "68fb7d0345cebbd7a50d939b98a1fc73ec09aa5d5eb06c633abf5b6af2ae198fb59ca054"
    );
    const comics = await axios.get(
      "http://gateway.marvel.com/v1/public/comics?offset=" +
        offset +
        "&limit=" +
        limit +
        "&ts=" +
        dateToString +
        "&apikey=5eb06c633abf5b6af2ae198fb59ca054&hash=" +
        hash
    );
    console.log(comics.data);
    res.json(comics.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/searchCharacterByName", async (req, res) => {
  console.log("function has been called");
  try {
    let date = Date.now();
    let dateToString = date.toString();
    let hash = cryptoJS.MD5(
      dateToString +
        "68fb7d0345cebbd7a50d939b98a1fc73ec09aa5d5eb06c633abf5b6af2ae198fb59ca054"
    );
    let filteredCharacters = await axios.get(
      "http://gateway.marvel.com/v1/public/characters?name=" +
        req.fields.searchedWord +
        "&ts=" +
        dateToString +
        "&apikey=5eb06c633abf5b6af2ae198fb59ca054&hash=" +
        hash
    );

    console.log(filteredCharacters);
    res.json(filteredCharacters.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen("3001", () => {
  console.log("the server is listening");
});
