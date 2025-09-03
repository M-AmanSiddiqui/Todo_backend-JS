import app from "./app.js";

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


