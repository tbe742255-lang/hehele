export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const r = await fetch(
      `https://api.keysco.re/lookup?query=${encodeURIComponent(q)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.KEYSCORE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      error: "API error",
      detail: e.message
    });
  }
}
