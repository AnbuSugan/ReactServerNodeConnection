import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anbu1995@",
  database: "dummy",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection success");
  }
});
// connect sql and nodejs
app.get("/", (req, res) => {
  const sql = "SELECT * FROM teacher";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});
// Create component connection

app.post("/Create", (req, res) => {
  const sql = "INSERT INTO teacher (`id`, `name`, `email`) VALUES (?)";

  const values = [req.body.id, req.body.name, req.body.email];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/Read/:id", (req, res) => {
  const sql = "SELECT * FROM teacher WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error inside server:", err);
      return res.status(500).json({ Message: "Error inside server" });
    }
    return res.send(result);
  });
});
app.put("/Update/:id", (req, res) => {
  const sql = "UPDATE teacher SET  `name`=?, `email`=? WHERE id=?";
  const id = req.params.id;

  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) {
      console.error("Error inside server:", err);
      return res.status(500).json({ Message: "Error inside server" });
    }

    return res.send(result);
  });
});
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM teacher WHERE id =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error inside server:", err);
      return res.status(500).json({ Message: "Error inside server" });
    }

    return res.send(result);
  });
});

app.listen(8081, () => {
  console.log("Listening");
});
