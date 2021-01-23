const app = require("./app");
const database = require("./database/database");

app.listen(app.get("port"), () => {
    console.log("the server is connected");
    database.init(app);
});

app.on("close", () => {
    console.log("terminate the server");
    if (database.db) {
        database.db.close();
    }
});
