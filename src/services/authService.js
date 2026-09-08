const API_URL = import.meta.env.VITE_API_URL;
const DEMO_MODE = !API_URL || import.meta.env.VITE_AUTH_DEMO_MODE === "true";

const wait = (duration = 650) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "Không thể kết nối. Vui lòng thử lại.");
  return data;
}

export async function login(credentials) {
  if (!DEMO_MODE)
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  await wait();
  return {
    user: { firstName: credentials.email.split("@")[0], lastName: "", email: credentials.email, phone: "", birthDate: "", gender: "" },
    token: "demo-session",
  };
}

export async function sendOtp(email) {
  if (!DEMO_MODE)
    return request("/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  await wait();
  return { sent: true };
}

export async function verifyOtp(email, otp) {
  if (!DEMO_MODE)
    return request("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  await wait();
  return { verified: true, verificationToken: "demo-verification" };
}

export async function completeRegistration(payload) {
  if (!DEMO_MODE)
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  await wait(800);
  return {
    user: { ...payload.profile, email: payload.email, birthDate: "" },
    token: "demo-session",
  };
}

export async function logout() {
  if (!DEMO_MODE) return request("/auth/logout", { method: "POST" });
  await wait(250);
}

export { DEMO_MODE };
