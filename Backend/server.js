const app = require("./app");

// Port run Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run port: ${PORT}`);
})
