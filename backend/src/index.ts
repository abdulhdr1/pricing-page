import app from "./Server";
import db from "./routes/dbConnection";

// Roda web server node na porta 9000
const port = Number(process.env.PORT || 9000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server started on port: " + port);
  (async () => {
    await db.sync();
  })();
});
