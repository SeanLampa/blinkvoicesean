const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const apiKey = 'ee187c52-f3da-4c62-8d5f-8d01848e22c0';
    const vendorId = '516279.8023';
    payload.vendorId = vendorId;

    const response = await fetch('https://testdevportal.marlincapitalsolutions.com:8077/ws/rest/partnerefapi/createPartnerEfApi/', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy listening on ${port}`));
