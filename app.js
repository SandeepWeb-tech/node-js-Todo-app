import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Item } from "./models/Item.js";
const { ObjectId } = mongoose.Types;
const publicPath = path.resolve("public");

const url =
  "url url";
mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const results = await Item.find();
  //   const results  = res.json(items);
  console.log(results);
  res.render("list", { results });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.get("/update/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const data = await Item.findOne({ _id: id });

  if (data) {
    res.render("update", { results: data });
  } else {
    res.send("Error");
  }
});

app.post("/update/:id", async (req, res) => {
  const result = await Item.updateOne(
      { _id: req.params.id},
      { $set: { name: req.body.name, content: req.body.content } }
    );
    if (result.modifiedCount > 0) {
      res.redirect("/");
    } else {
      res.send("No document updated");
    }
});

app.get("/delete/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  await Item.deleteOne({ _id: id });
  res.redirect("/");
  //   res.render("update");
});

app.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const newItem = new Item({
      name: req.body.name,
      content: req.body.content,
    });
    await newItem.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(500).send("Error saving item");
  }
});

// app.post("/update", (req, res) => {
//   console.log("I am click");
//   res.redirect("/");
// });

app.listen(3000);
