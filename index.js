const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require("fs").promises;
const database = "database.json"

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createCard");
});

app.post("/", (req, res) => {
  let userObj = {
    id: Math.round(Math.random(0,9) * 1000, 4),
    name: req.body.name,
    aboutMe: req.body.aboutMe,
    github: req.body.github,
    twitter: req.body.twitter,
    books: req.body.books.split(","),
  }
  fs.readFile(database, "utf-8")
    .then(dataObjJson => {
      let dataObj = JSON.parse(dataObjJson)
      console.log(dataObj["users"])
      dataObj["users"].push(userObj)
      return dataObj
    })
    .then(dataObj => {
      fs.writeFile(database, JSON.stringify(dataObj))
    })
})

app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
