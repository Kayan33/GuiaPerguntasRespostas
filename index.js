const express = require("express")
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
  games: [
    {
      id: 23,
      title: "call pf duty",
      year: 2019,
      price: 60,
    },

    {
      id: 400,
      title: "Among Us",
      year: 2019,
      price: 60,
    },

    {
      id: 2,
      title: "Minecraft",
      year: 2019,
      price: 60,
    },

    {
      id: 777,
      title: "Fortnite",
      year: 2019,
      price: 60,
    }
  ]
}

app.get("/game", (req, res) => {
  res.statusCode = 200
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {

  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {

    var id = parseInt(req.params.id);
    var game = DB.games.find(game=>game.id == id)

    if (game != undefined) {
      res.statusCode= 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game",(req,res)=>{
  const {title, price, year} = req.body
  if (price == null || isNaN(price) || year == null || isNaN(year)) {
   return res.sendStatus(400);
  }

  if( title == "") {
    return res.sendStatus(400)
  }

    DB.games.push({
     id: Date.now(),
     title,
     price,
     year
    })
  

  res.sendStatus(200);
});

  app.delete("/game/:id",(req,res)=>{
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
      var id = parseInt(req.params.id)
      var index = DB.games.findIndex(g => g.id == id);

      if (index == -1) {
        res.sendStatus(404)
      } else {
        DB.games.splice(index,1)
        res.sendStatus(200)
      }
    }
  });

app.listen(777, () => { console.log("API rodando"); });