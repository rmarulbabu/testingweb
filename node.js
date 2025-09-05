const twilio = require("twilio");
const client = twilio("TWILIO_SID", "TWILIO_AUTH");

app.post("/send-otp", async (req, res) => {
  await client.verify.v2.services("SERVICE_ID")
    .verifications.create({ to: req.body.phone, channel: "sms" });
  res.send("OTP sent");
});

app.post("/verify-otp", async (req, res) => {
  const check = await client.verify.v2.services("SERVICE_ID")
    .verificationChecks.create({ to: req.body.phone, code: req.body.code });
  if (check.status === "approved") res.send("success");
  else res.status(400).send("fail");
});
