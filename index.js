import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Set up view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/price", async (req,res)=>{

    const coin = req.body.coin.toLowerCase();  // e.g. 'bitcoin'
    try {

        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
        const response = await axios.get(url);
        const price = response.data[coin] ? response.data[coin].usd : null;



        if (price) {
            res.render("result.ejs",{coin:coin.toLowerCase(),price});

            
        } else {
            res.render("result", { coin: coin.toUpperCase(), price: "Not Found" });
            
        }
        
    } catch (error) {
        console.error(error.message);
        res.render("result", { coin: coin.toUpperCase(), price: "Error fetching price" });
        
    }


});




app.listen(port,()=>{

    console.log(`port is running at server: ${port}.`);
});
