const express = require('express'),
    app     = express(),
    PORT    = process.env.PORT || 3001;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log("Services App FRONTEND running on port: ", PORT);
});
