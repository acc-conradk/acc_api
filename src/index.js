const express = require('express');
const app = express();
const PORT = 8081;
app.use('/', (req, res) => {
    res.json({
        status: 'ok',
    });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
