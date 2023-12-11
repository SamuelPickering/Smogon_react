import express from "express";
import mysql from "mysql2";
import cors from "cors"
// import jsonData from './OU-10-23.json' assert { type: "json" };
// console.log(jsonData)
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vaushlovehorse7!",
  database: "pokemon",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
//  app.use(express.json()) for when I make teambuilder
 app.use(cors())
app.get("/", (req, res) => {
  res.json("ok it works");
});

app.get("/pokemon", (req, res) => {
  const query = "SELECT * FROM pokedata";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/pokemon/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const query = "SELECT * FROM pokedata WHERE name = ?";
      db.query(query, [name], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      
        if (data.length === 0) {
          return res.status(404).json({ message: "Pokemon not found" });
        }
        const pokemonData = data[0];
        console.log(`Received row for ${name}`);
        return res.json(pokemonData);
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err.message);
    }
  });
  
    
app.get("/pokemon-insert-10-OU",  async (req, res) => {
  try {
    for(const pokemon of jsonData){
      const { name, Stats, Type, Sprite, id, usage, rank, meta} = pokemon
      const [type1, type2] = Type.types
      const {HP, Atk, Def, SpA, SpD, Spe} = Stats
      const tier = "OU"
      const date = "2023-10-01" // Didn't add date and tier values to the first Json so you have to make variables for it here
      const query = `INSERT IGNORE into pokedata(id, tier, name,
        \`data\`, type1, type2, hp, atk, def, spAtk, spDef, spe, sprite, \`date\`, \`usage\`, \`rank\`)
         Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [id, tier, name, meta, type1, type2, HP, Atk, Def, SpA, SpD, Spe, Sprite, date, usage, rank ]
      await db.execute(query, values)
      console.log(`Inserted  row for ${name}`)
      
    }
    res.json("Data inserted successfully")
  }
  catch (error){
    console.error("Error inserting data:", error);
    res.status(500).json(error.message)
  }
})

app.listen(3000, ()=> {
    console.log("Connected to backend")
})