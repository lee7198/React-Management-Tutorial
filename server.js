const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/128/128/any",
      name: "이도경1",
      birthday: "981228",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://placeimg.com/128/128/1",
      name: "박신입",
      birthday: "020101",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 3,
      image: "https://placeimg.com/128/128/2",
      name: "김화석",
      birthday: "931231",
      gender: "남자",
      job: "대학생",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
