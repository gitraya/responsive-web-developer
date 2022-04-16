const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Responsive Web Developer</h1>");
});

app.use(
  "/404-not-found-page",
  express.static(path.join(__dirname, "404-not-found-page"))
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
