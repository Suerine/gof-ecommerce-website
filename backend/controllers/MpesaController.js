import axios from "axios";

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getAccessToken = async () => {
  const credentials = Buffer.from(
    `${CONSUMER_KEY}:${CONSUMER_SECRET}`,
  ).toString("base64");
  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    // Production → "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    { headers: { Authorization: `Basic ${credentials}` } },
  );
  return res.data.access_token;
};

const getTimestamp = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
};

const getPassword = (timestamp) =>
  Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");

const formatPhone = (phone) => phone.replace(/\s+/g, "").replace(/^0/, "254");

// ─── STK Push ────────────────────────────────────────────────────────────────

export const stkPush = async (req, res) => {
  try {
    const { phone, amount, orderId, shipping } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ message: "Phone and amount are required" });
    }

    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = getPassword(timestamp);
    const formattedPhone = formatPhone(phone);

    const payload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.ceil(amount),
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: orderId || "GOF-ORDER",
      TransactionDesc: "Goats of Football Order",
    };

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      // Production → "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    res.status(200).json({
      CheckoutRequestID: stkRes.data.CheckoutRequestID,
      MerchantRequestID: stkRes.data.MerchantRequestID,
      ResponseCode: stkRes.data.ResponseCode,
      CustomerMessage: stkRes.data.CustomerMessage,
    });
  } catch (err) {
    console.error("STK Push error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: "STK push failed", error: err.response?.data });
  }
};

// ─── Query Transaction Status ─────────────────────────────────────────────────

export const queryTransaction = async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.status(400).json({ message: "checkoutRequestId is required" });
    }

    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = getPassword(timestamp);

    const payload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const queryRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      // Production → "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    res.status(200).json({
      ResultCode: queryRes.data.ResultCode,
      ResultDesc: queryRes.data.ResultDesc,
    });
  } catch (err) {
    // Daraja returns an error when payment is still pending — treat as pending
    const errorCode = err.response?.data?.errorCode;
    if (errorCode === "500.001.1001") {
      return res.status(200).json({ ResultCode: null, ResultDesc: "Pending" });
    }
    console.error("Query error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: "Query failed", error: err.response?.data });
  }
};

// ─── Callback (Safaricom POSTs here after payment) ───────────────────────────

export const mpesaCallback = async (req, res) => {
  try {
    const body = req.body?.Body?.stkCallback;

    if (!body) {
      return res.status(200).json({ message: "No callback body" });
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = body;

    if (ResultCode === 0) {
      const metaItems = CallbackMetadata?.Item || [];
      const getMeta = (name) => metaItems.find((i) => i.Name === name)?.Value;

      const paymentData = {
        merchantRequestId: MerchantRequestID,
        checkoutRequestId: CheckoutRequestID,
        amount: getMeta("Amount"),
        mpesaReceiptNumber: getMeta("MpesaReceiptNumber"),
        transactionDate: getMeta("TransactionDate"),
        phoneNumber: getMeta("PhoneNumber"),
      };

      console.log("✅ M-Pesa payment confirmed:", paymentData);

      // TODO: Save order to DB
      // await Order.create({ ...paymentData, status: "paid" })
      // await Cart.findOneAndUpdate({ user }, { items: [] })
    } else {
      console.log("❌ Payment failed:", ResultCode, ResultDesc);
      // TODO: Update order status to "failed"
    }

    // Always respond 200 — Safaricom expects this
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback error:", err.message);
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
};
