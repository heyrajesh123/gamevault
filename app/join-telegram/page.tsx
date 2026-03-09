import { redirect } from "next/navigation";

const TELEGRAM_LINK = "https://t.me/"; // Apna Telegram link yahan daalo

export default function JoinTelegram() {
  redirect(TELEGRAM_LINK);
}
