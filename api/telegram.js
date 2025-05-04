export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Only POST allowed
    }
  
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
    const { pusher, head_commit, repository } = req.body;
  
    const message = `📦 Repo: ${repository.name}
  👤 User: ${pusher.name}
  📝 Commit: ${head_commit.message}`;
  
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
  
      res.status(200).json({ ok: true, message: 'Sent to Telegram' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
  