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
    id: Math.round(Math.random(0,9) * 1000, 4), // Math.floor(Math.random() * 600)
    name: req.body.name,
    aboutMe: req.body.aboutMe,
    github: req.body.github,
    twitter: req.body.twitter,
    books: req.body.books.split(","),
  }
  fs.readFile(database, "utf-8") // default is buffer
    .then((content) => JSON.parse(content))
    .then((jsonObj) => {
      let newJsonObj = jsonObj;
      newJsonObj.users.push(userObj)
      fs.writeFile(database, JSON.stringify(newJsonObj))
      .then(res.redirect(`/people/${userObj.id}`))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })


app.get("/people/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile("database.json", "utf8")
    .then((content) => JSON.parse(content).users)
    .then((listOfUsers) => listOfUsers.find((user) => user.id === id))
    .then((foundUser) => {
      res.render("people", { user: foundUser });
    });
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
