const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/lease-request', async (req, res) => {
  try {
    const sheetPayload = req.body;

    const apiKey = 'ee187c52-f3da-4c62-8d5f-8d01848e22c0';
    const url = 'https://api.peacsolutions.com/v1/applications';

    const payload = {
      businessName: sheetPayload.businessName,
      businessType: sheetPayload.businessType,
      contactName: sheetPayload.contactName,
      contactEmail: sheetPayload.contactEmail,
      equipmentDescription: sheetPayload.equipmentDescription,
      monthlyPayment: parseFloat(sheetPayload.monthlyPayment || 0).toFixed(2),
      equipmentCost: parseFloat(sheetPayload.equipmentCost || 0).toFixed(2),
      term: String(sheetPayload.term || 0),
      purchaseOption: sheetPayload.purchaseOption,
      comments: sheetPayload.comments,
      vendorId: "516279.8023"
    };

    const response = await fetch(url, {
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

app.all('*', (req, res) => res.status(404).send('Not Found'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy listening on ${port}`));
