import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=c351f99ed06f239b0710cd8f27a573cc&query=${req.body.location}`);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error(`Failed to make request: ${error.message}`);
        res.render("index.ejs", { error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}...`);
});