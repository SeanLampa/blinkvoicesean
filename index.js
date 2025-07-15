const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/lease-request', async (req, res) => {
  try {
    const sheetPayload = req.body;

    const apiKey = 'b2e3d37b-3105-4ed9-a022-d8a2057e0862';
    const url = 'https://testdevportal.marlincapitalsolutions.com:8077/ws/rest/partnerefapi/createPartnerEfApi/';

    const payload = {
      PartnerReferenceNumber: "AutoDocs-" + Date.now(),
      VendorNumber: "516279.8023",
      BusinessName: sheetPayload.businessName,
      ContactName: sheetPayload.contactName,
      Phone: "555-555-5555",  // Replace or pull from Sheet if needed
      Email: sheetPayload.contactEmail,
      EquipmentDescription: sheetPayload.equipmentDescription,
      MonthlyPayment: (sheetPayload.monthlyPayment || 0).toFixed(2),
      EquipmentCost: (sheetPayload.equipmentCost || 0).toFixed(2),
      LeaseTerm: sheetPayload.term ? String(sheetPayload.term) : "0",
      PurchaseOption: sheetPayload.purchaseOption,
      Notes: sheetPayload.comments
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
