const EXPRESS = require("express");
const APP = express();
const PORT = 3000;
APP.use(EXPRESS.static("public"));
APP.listen(PORT, () => {
    console.log("Servidor en el puerto " + PORT);
});
