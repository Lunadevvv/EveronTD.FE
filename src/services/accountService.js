const API_URL = import.meta.env.VITE_API_URL;
const DEMO_MODE = !API_URL || import.meta.env.VITE_AUTH_DEMO_MODE === "true";
const wait = (duration = 550) => new Promise((resolve) => window.setTimeout(resolve, duration));

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Không thể kết nối. Vui lòng thử lại.");
  return data;
}

export async function updateProfile(profile) {
  if (!DEMO_MODE) return request("/account/profile", { method: "PATCH", body: JSON.stringify(profile) });
  await wait(); return profile;
}

export async function changePassword(passwords) {
  if (!DEMO_MODE) return request("/account/password", { method: "PUT", body: JSON.stringify(passwords) });
  await wait(); return { updated: true };
}

export async function getOrders() {
  if (!DEMO_MODE) return request("/account/orders");
  await wait();
  return [
    { id: "EVR20260908001", date: "08/09/2026", status: "shipping", total: 3450000, items: [{ productId: "everon-1", name: "Linen Calm", quantity: 1 }, { productId: "everon-2", name: "Morning Mist", quantity: 2 }] },
    { id: "EVR20260819008", date: "19/08/2026", status: "delivered", total: 1890000, items: [{ productId: "everon-2", name: "Morning Mist", quantity: 1 }] },
    { id: "EVR20260702004", date: "02/07/2026", status: "cancelled", total: 1559400, items: [{ productId: "everon-3", name: "Soft Serenity", quantity: 1 }] },
  ];
}

export { DEMO_MODE };
