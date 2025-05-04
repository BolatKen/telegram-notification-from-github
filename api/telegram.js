// Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).end(); // Only POST allowed
    }
  
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
    const { pusher, head_commit, repository } = req.body;
  
    const message = `📦 Репозиторий: ${repository.name}
  👤 Пользователь: ${pusher.name}
  📝 Комментарий: ${head_commit.message}`;
  
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
    try {
      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
  
      res.status(200).json({ status: "Message sent" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  }
  