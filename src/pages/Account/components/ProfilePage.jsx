import { useState } from "react";
import { Check, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { changePassword, updateProfile } from "../../../services/accountService";
import styles from "../Account.module.css";

const phonePattern = /^(\+84|0)(3|5|7|8|9)\d{8}$/;

function Field({ label, error, helper, ...props }) {
  const id = props.name;
  return <label className={styles.field} htmlFor={id}><span>{label}</span><input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined} {...props} />{error && <small id={`${id}-error`} className={styles.error}>{error}</small>}{helper && !error && <small id={`${id}-helper`}>{helper}</small>}</label>;
}

function PasswordField({ label, name, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return <label className={styles.field} htmlFor={name}><span>{label}</span><span className={styles.passwordField}><input id={name} name={name} type={visible ? "text" : "password"} value={value} onChange={onChange} autoComplete={name === "currentPassword" ? "current-password" : "new-password"} /><button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({ lastName: user?.lastName || "Nguyễn", firstName: user?.firstName || "Minh", birthDate: user?.birthDate || "", phone: user?.phone || "", gender: user?.gender || "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setValue = (name, value) => setProfile((current) => ({ ...current, [name]: value }));

  const saveProfile = async (event) => {
    event.preventDefault(); const nextErrors = {};
    if (!profile.lastName.trim()) nextErrors.lastName = "Vui lòng nhập họ.";
    if (!profile.firstName.trim()) nextErrors.firstName = "Vui lòng nhập tên.";
    if (profile.phone && !phonePattern.test(profile.phone.replace(/\s/g, ""))) nextErrors.phone = "Số điện thoại không hợp lệ.";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);
    setLoading(true); setStatus(""); setErrors({});
    try { const updated = await updateProfile(profile); updateUser({ ...user, ...updated }); setStatus("Thông tin đã được cập nhật."); }
    catch { setStatus("Không thể cập nhật thông tin. Vui lòng thử lại."); }
    finally { setLoading(false); }
  };

  const savePassword = async (event) => {
    event.preventDefault(); setPasswordStatus("");
    if (passwords.newPassword.length < 8) return setPasswordStatus("Mật khẩu mới cần có ít nhất 8 ký tự.");
    if (passwords.newPassword !== passwords.confirmPassword) return setPasswordStatus("Mật khẩu xác nhận không khớp.");
    setLoading(true);
    try { await changePassword(passwords); setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); setPasswordStatus("Mật khẩu đã được cập nhật."); setShowPassword(false); }
    catch { setPasswordStatus("Không thể cập nhật mật khẩu. Vui lòng thử lại."); }
    finally { setLoading(false); }
  };

  return <>
    <section className={styles.section} aria-labelledby="personal-heading"><div className={styles.sectionHeading}><div><p className="eyebrow">Hồ sơ</p><h2 id="personal-heading">Thông tin cá nhân</h2></div><span className={styles.avatar}>{profile.firstName.slice(0, 1).toUpperCase() || "E"}</span></div>
      <form className={styles.profileForm} onSubmit={saveProfile} noValidate>
        <div className={styles.fieldGrid}><Field label="Họ" name="lastName" value={profile.lastName} onChange={(e) => setValue("lastName", e.target.value)} error={errors.lastName} /><Field label="Tên" name="firstName" value={profile.firstName} onChange={(e) => setValue("firstName", e.target.value)} error={errors.firstName} /></div>
        <div className={styles.fieldGrid}><Field label="Ngày sinh" name="birthDate" type="date" value={profile.birthDate} onChange={(e) => setValue("birthDate", e.target.value)} /><Field label="Số điện thoại" name="phone" type="tel" placeholder="09xxxxxxxx" value={profile.phone} onChange={(e) => setValue("phone", e.target.value)} error={errors.phone} /></div>
        <Field label="Email" name="email" type="email" value={user?.email || "example@gmail.com"} readOnly helper="Email không thể thay đổi." />
        <fieldset className={styles.gender}><legend>Giới tính <span>(không bắt buộc)</span></legend><div>{[["male","Nam"],["female","Nữ"],["other","Khác"],["private","Không muốn cung cấp"]].map(([value,label]) => <label key={value}><input type="radio" name="gender" value={value} checked={profile.gender === value} onChange={(e) => setValue("gender", e.target.value)} /><span>{label}</span></label>)}</div></fieldset>
        <div className={styles.formActions}><button className={styles.primary} disabled={loading}>{loading ? <LoaderCircle className={styles.spinner} size={17} /> : <Check size={17} />}Lưu thay đổi</button>{status && <p role="status">{status}</p>}</div>
      </form>
    </section>
    <section className={styles.security} aria-labelledby="security-heading"><div><span><LockKeyhole size={20} /></span><div><h2 id="security-heading">Bảo mật</h2><p>Quản lý mật khẩu và bảo vệ tài khoản của bạn.</p></div></div>
      {!showPassword ? <button className={styles.secondary} type="button" onClick={() => setShowPassword(true)}>Đổi mật khẩu</button> : <form className={styles.passwordForm} onSubmit={savePassword}><PasswordField label="Mật khẩu hiện tại" name="currentPassword" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} /><PasswordField label="Mật khẩu mới" name="newPassword" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} /><PasswordField label="Xác nhận mật khẩu mới" name="confirmPassword" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} /><div className={styles.formActions}><button className={styles.primary} disabled={loading}>Cập nhật mật khẩu</button><button className={styles.textButton} type="button" onClick={() => setShowPassword(false)}>Hủy</button></div>{passwordStatus && <p className={styles.status} role="status">{passwordStatus}</p>}</form>}
    </section>
  </>;
}
