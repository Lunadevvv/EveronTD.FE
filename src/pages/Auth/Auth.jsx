import { useEffect, useState } from "react";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { DEMO_MODE, sendOtp, verifyOtp } from "../../services/authService";
import AuthField from "./components/AuthField";
import AuthProgress from "./components/AuthProgress";
import OtpInput from "./components/OtpInput";

import styles from "./Auth.module.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(\+84|0)(3|5|7|8|9)\d{8}$/;
const passwordValid = (value) =>
  value.length >= 8 &&
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value);
const maskEmail = (email) => {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}${"*".repeat(Math.max(2, name.length - 2))}@${domain}`;
};
const previousUrl = sessionStorage.getItem("everon_auth_return") || "/";

function SubmitButton({ loading, children }) {
  return (
    <button className={styles.primaryButton} type="submit" disabled={loading}>
      {loading && (
        <LoaderCircle className={styles.spinner} size={17} aria-hidden="true" />
      )}
      {loading ? "Đang xử lý..." : children}
    </button>
  );
}

export default function Auth({ mode }) {
  const { login, register } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phone: "",
    gender: "",
  });
  const [otp, setOtp] = useState(() => Array(6).fill(""));
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  const [notice, setNotice] = useState("");
  const isLogin = mode === "login";

  useEffect(() => {
    if (isLogin || step !== 2 || timer <= 0) return undefined;
    const id = window.setInterval(() => setTimer((value) => value - 1), 1000);
    return () => window.clearInterval(id);
  }, [isLogin, step, timer]);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name])
      setErrors((current) => ({ ...current, [name]: undefined }));
  };
  const onBlur = (name) => {
    if (name === "email" && !emailPattern.test(form.email))
      setErrors((e) => ({
        ...e,
        email: "Vui lòng nhập địa chỉ email hợp lệ.",
      }));
    if (name === "phone" && !phonePattern.test(form.phone.replace(/\s/g, "")))
      setErrors((e) => ({ ...e, phone: "Số điện thoại không hợp lệ." }));
  };
  const fail = (message) =>
    setErrors((current) => ({
      ...current,
      form: message || "Không thể kết nối. Vui lòng thử lại.",
    }));

  const submitLogin = async (event) => {
    event.preventDefault();
    const next = {};
    if (!emailPattern.test(form.email))
      next.email = "Vui lòng nhập địa chỉ email hợp lệ.";
    if (!form.password) next.password = "Vui lòng nhập mật khẩu.";
    if (Object.keys(next).length) return setErrors(next);
    setLoading(true);
    setErrors({});
    try {
      await login({ email: form.email, password: form.password });
      window.location.assign(previousUrl);
    } catch (error) {
      fail(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitCredentials = async (event) => {
    event.preventDefault();
    const next = {};
    if (!emailPattern.test(form.email))
      next.email = "Vui lòng nhập địa chỉ email hợp lệ.";
    if (!passwordValid(form.password))
      next.password = "Mật khẩu chưa đáp ứng đầy đủ yêu cầu.";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Mật khẩu xác nhận chưa khớp.";
    if (Object.keys(next).length) return setErrors(next);
    setLoading(true);
    setErrors({});
    try {
      await sendOtp(form.email);
      setTimer(45);
      setStep(2);
    } catch (error) {
      fail(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    if (!otp.every(Boolean))
      return setErrors({ otp: "Vui lòng nhập đủ 6 chữ số." });
    setLoading(true);
    setErrors({});
    try {
      await verifyOtp(form.email, otp.join(""));
      setStep(3);
    } catch (error) {
      setErrors({
        otp: error.message || "Mã xác thực không chính xác. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitProfile = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.lastName.trim()) next.lastName = "Vui lòng nhập họ.";
    if (!form.firstName.trim()) next.firstName = "Vui lòng nhập tên.";
    if (!phonePattern.test(form.phone.replace(/\s/g, "")))
      next.phone = "Số điện thoại không hợp lệ.";
    if (Object.keys(next).length) return setErrors(next);
    setLoading(true);
    setErrors({});
    try {
      await register({
        email: form.email,
        password: form.password,
        otp: otp.join(""),
        profile: {
          lastName: form.lastName,
          firstName: form.firstName,
          phone: form.phone,
          gender: form.gender,
        },
      });
      setStep(4);
    } catch (error) {
      fail(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (timer > 0 || loading) return;
    setLoading(true);
    setNotice("");
    try {
      await sendOtp(form.email);
      setTimer(45);
      setNotice("Mã xác thực mới đã được gửi.");
    } catch (error) {
      fail(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.formPanel}>
        <header className={styles.authHeader}>
          <a href="/" className={styles.logo} aria-label="Trang chủ Everon">
            EVERON
          </a>
          <a href="/" className={styles.back}>
            <ArrowLeft size={17} aria-hidden="true" /> Quay lại trang chủ
          </a>
        </header>
        <div className={styles.formShell}>
          {!isLogin && step < 4 && <AuthProgress step={step} />}
          {DEMO_MODE && (
            <p className={styles.demoNote}>
              Chế độ trải nghiệm giao diện · kết nối API qua VITE_API_URL
            </p>
          )}
          {isLogin && (
            <form onSubmit={submitLogin} noValidate>
              <div className={styles.intro}>
                <p className="eyebrow">Tài khoản Everon</p>
                <h1>Chào mừng trở lại</h1>
                <p>
                  Đăng nhập để tiếp tục mua sắm và quản lý tài khoản của bạn.
                </p>
              </div>
              {errors.form && (
                <div className={styles.formError} role="alert">
                  {errors.form}
                </div>
              )}
              <AuthField
                label="Email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setValue("email", e.target.value)}
                onBlur={() => onBlur("email")}
                error={errors.email}
              />
              <AuthField
                label="Mật khẩu"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password}
                password={{ visible, onToggle: () => setVisible((v) => !v) }}
              />
              <div className={styles.formOptions}>
                <label>
                  <input type="checkbox" /> Ghi nhớ đăng nhập
                </label>
                <a
                  href="/login?view=forgot-password"
                  title="Tính năng khôi phục mật khẩu sẽ sớm được cập nhật"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <SubmitButton loading={loading}>Đăng nhập</SubmitButton>
              <p className={styles.switch}>
                Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
              </p>
            </form>
          )}

          {!isLogin && step === 1 && (
            <form onSubmit={submitCredentials} noValidate>
              <div className={styles.intro}>
                <p className="eyebrow">Bước 01</p>
                <h1>Tạo tài khoản</h1>
                <p>
                  Tạo tài khoản để mua sắm nhanh hơn và quản lý đơn hàng của
                  bạn.
                </p>
              </div>
              {errors.form && (
                <div className={styles.formError} role="alert">
                  {errors.form}
                </div>
              )}
              <AuthField
                label="Email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setValue("email", e.target.value)}
                onBlur={() => onBlur("email")}
                error={errors.email}
              />
              <AuthField
                label="Mật khẩu"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password}
                password={{ visible, onToggle: () => setVisible((v) => !v) }}
              />
              <ul className={styles.requirements} aria-label="Yêu cầu mật khẩu">
                <li className={form.password.length >= 8 ? styles.met : ""}>
                  <Check size={13} />
                  Ít nhất 8 ký tự
                </li>
                <li
                  className={
                    /[a-z]/.test(form.password) && /[A-Z]/.test(form.password)
                      ? styles.met
                      : ""
                  }
                >
                  <Check size={13} />
                  Chữ hoa và chữ thường
                </li>
                <li className={/\d/.test(form.password) ? styles.met : ""}>
                  <Check size={13} />
                  Ít nhất 1 chữ số
                </li>
              </ul>
              <AuthField
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type={confirmVisible ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => setValue("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                password={{
                  visible: confirmVisible,
                  onToggle: () => setConfirmVisible((v) => !v),
                }}
              />
              <SubmitButton loading={loading}>Tiếp tục</SubmitButton>
              <p className={styles.switch}>
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </form>
          )}

          {!isLogin && step === 2 && (
            <form onSubmit={submitOtp} noValidate>
              <div className={styles.intro}>
                <p className="eyebrow">Bước 02</p>
                <h1>Xác thực email</h1>
                <p>
                  Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến{" "}
                  <strong>{maskEmail(form.email)}</strong>. Vui lòng kiểm tra
                  hộp thư.
                </p>
              </div>
              <OtpInput
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setErrors({});
                }}
                invalid={Boolean(errors.otp)}
              />
              {errors.otp && (
                <p id="otp-error" className={styles.otpError} role="alert">
                  {errors.otp}
                </p>
              )}
              {notice && (
                <p className={styles.notice} role="status">
                  {notice}
                </p>
              )}
              <SubmitButton loading={loading}>Xác nhận</SubmitButton>
              <div className={styles.resend}>
                <span>Không nhận được mã?</span>
                <button
                  type="button"
                  disabled={timer > 0 || loading}
                  onClick={resend}
                >
                  {timer > 0
                    ? `Gửi lại mã sau 00:${String(timer).padStart(2, "0")}`
                    : "Gửi lại mã"}
                </button>
              </div>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => {
                  setStep(1);
                  setOtp(Array(6).fill(""));
                }}
              >
                <ArrowLeft size={16} /> Thay đổi email
              </button>
            </form>
          )}

          {!isLogin && step === 3 && (
            <form onSubmit={submitProfile} noValidate>
              <div className={styles.intro}>
                <p className="eyebrow">Bước 03</p>
                <h1>Thông tin cá nhân</h1>
                <p>Chỉ còn một bước nữa để hoàn tất tài khoản của bạn.</p>
              </div>
              {errors.form && (
                <div className={styles.formError} role="alert">
                  {errors.form}
                </div>
              )}
              <div className={styles.nameGrid}>
                <AuthField
                  label="Họ *"
                  name="lastName"
                  placeholder="Nguyễn"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => setValue("lastName", e.target.value)}
                  error={errors.lastName}
                />
                <AuthField
                  label="Tên *"
                  name="firstName"
                  placeholder="Minh Anh"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => setValue("firstName", e.target.value)}
                  error={errors.firstName}
                />
              </div>
              <AuthField
                label="Số điện thoại *"
                name="phone"
                type="tel"
                placeholder="09xxxxxxxx"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setValue("phone", e.target.value)}
                onBlur={() => onBlur("phone")}
                error={errors.phone}
              />
              <fieldset className={styles.gender}>
                <legend>
                  Giới tính <span>(không bắt buộc)</span>
                </legend>
                <div>
                  {[
                    ["male", "Nam"],
                    ["female", "Nữ"],
                    ["other", "Khác"],
                  ].map(([value, label]) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={form.gender === value}
                        onChange={(e) => setValue("gender", e.target.value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <SubmitButton loading={loading}>Hoàn tất đăng ký</SubmitButton>
            </form>
          )}

          {!isLogin && step === 4 && (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>
                <Check size={28} />
              </span>
              <p className="eyebrow">Hoàn tất</p>
              <h1>Đăng ký thành công</h1>
              <p>
                Chào mừng {form.firstName} đến với Everon. Tài khoản của bạn đã
                được tạo thành công.
              </p>
              <a className={styles.primaryButton} href={previousUrl}>
                Tiếp tục mua sắm
              </a>
            </div>
          )}
        </div>
      </section>
      <aside className={styles.visual} aria-label="Không gian phòng ngủ Everon">
        <img
          src="/assets/hero.png"
          alt="Phòng ngủ ấm áp với bộ chăn ga Everon"
        />
        <div>
          <p>Chạm vào sự êm ái</p>
          <h2>Mỗi giấc ngủ là một khoảng bình yên.</h2>
        </div>
      </aside>
    </main>
  );
}
