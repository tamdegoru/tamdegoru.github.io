// backend/server.js
import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());

// ✅ Neon/Render: підключення через DATABASE_URL + SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ✅ корінь (щоб не було Cannot GET /)
app.get("/", (req, res) => {
  res.send("OK");
});

// ✅ healthcheck + діагностика помилок підключення
app.get("/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, now: r.rows[0].now });
  } catch (e) {
    res.status(500).json({
      ok: false,
      name: e?.name,
      message: e?.message,
      // AggregateError часто містить масив errors
      errors: e?.errors?.map((er) => ({
        name: er?.name,
        message: er?.message,
        code: er?.code,
      })),
    });
  }
});

// ✅ 1 раз викликати для створення таблиці
app.post("/init", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS security_logs (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address INET,
        user_agent TEXT,
        referer TEXT,
        accept_language VARCHAR(50),
        screen_res VARCHAR(20),
        is_bot BOOLEAN DEFAULT FALSE
      );
    `);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, message: e?.message || String(e) });
  }
});

// ✅ запис (навчально). IP краще брати на сервері, а не з клієнта
app.post("/log", async (req, res) => {
  try {
    const { user_agent, referer, accept_language, screen_res, is_bot } = req.body || {};

    // якщо Render за проксі — IP може бути в заголовках; тут базово
    const ip =
      (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() ||
      req.socket.remoteAddress ||
      null;

    await pool.query(
      `INSERT INTO security_logs (ip_address, user_agent, referer, accept_language, screen_res, is_bot)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [ip, user_agent ?? null, referer ?? null, accept_language ?? null, screen_res ?? null, !!is_bot]
    );

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, message: e?.message || String(e) });
  }
});

// ✅ подивитися останні записи
app.get("/logs", async (req, res) => {
  try {
    const r = await pool.query(`SELECT * FROM security_logs ORDER BY id DESC LIMIT 50`);
    res.json({ ok: true, rows: r.rows });
  } catch (e) {
    res.status(500).json({ ok: false, message: e?.message || String(e) });
  }
});

// ✅ Render дає PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Listening on", PORT));
