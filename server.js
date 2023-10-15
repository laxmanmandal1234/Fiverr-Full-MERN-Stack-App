import { connectDatabase } from "./data/database.js";
import { app } from "./app.js";

//listen to server
app.listen(process.env.PORT, () => {
  //connect to database
  connectDatabase();

  console.log(`Server is running on port ${process.env.PORT}`);
});
