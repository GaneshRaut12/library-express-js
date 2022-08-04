const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/book-lib-crud")
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log(err));

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  education: String,
});
const Author = new mongoose.model("Author", authorSchema);

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.use("/static", express.static(path.join(__dirname, "views")));
// app.use(express.static(path.join(__dirname, 'views')));

app.use(express.static(path.join(__dirname, "views")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/index.html"));
});

app.get("/add-author", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/author.html"));
});
app.get("/add-book", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/book.html"));
});
app.get("/genres", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/genre.html"));
});

app.post("/add-author", (req, res) => {
  console.log(req.body.firstName);
  const authrDetails = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    education: req.body.education,
  });
  authrDetails.save();
  //   const ll =authrDetails.find();
  //   console.log(ll);y
  console.log("Post request made");
  res.sendFile(path.join(__dirname, "views", "/index.html"));
});

app.get("/get-author", (req, res) => {
  Author.find(function (err, datas) {
    if (err) return console.error(err);
    console.log(datas);
    res.json(datas);
  });
  // console.log(allAuthors);
});

app.delete("/delete-author/:id", function (req, res) {
  let deleteId = req.params.id;
  console.log(typeof deleteId);
  Author.findByIdAndDelete(deleteId, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.end();
  });
});

app.post("/update-author/:id", (req, res) => {
  let updateId = req.params.id;
  Author.findOneAndUpdate(
    {
      _id: updateId,
    },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        education: req.body.education,
      },
    },
    {
      upsert: true,
    },
    function (err, newBook) {
      if (err) {
        res.send("error updating book");
      } else {
        console.log(newBook);
        res.sendFile(path.join(__dirname, "views", "/author.html"));
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Listing on the port 3000");
});
