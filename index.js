const app = require("./app");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

console.log(PORT)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});