const express = require("express");
const cors = require("cors");

const AuthRoutes = require("./routes/auth.routes");
const ContentRoutes = require("./routes/content.routes");
const FoumRoutes = require("./routes/forum.routes");
const UserRoutes = require("./routes/user.routes");
const connectionDB = require("./database/connectionDB");

const app = express();
const port = 5000;

connectionDB();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/content", ContentRoutes);
app.use("/forum", FoumRoutes);
app.use("/users", UserRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
