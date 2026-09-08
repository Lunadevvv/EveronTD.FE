import { Eye, EyeOff } from "lucide-react";

import styles from "../Auth.module.css";

export default function AuthField({
  label,
  error,
  helper,
  password,
  ...inputProps
}) {
  const id = inputProps.id || inputProps.name;
  const describedBy = error
    ? `${id}-error`
    : helper
      ? `${id}-helper`
      : undefined;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={`${styles.inputWrap} ${error ? styles.inputError : ""}`}>
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {password && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={password.onToggle}
            aria-label={password.visible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
            aria-pressed={password.visible}
          >
            {password.visible ? (
              <EyeOff size={19} aria-hidden="true" />
            ) : (
              <Eye size={19} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error ? (
        <span id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </span>
      ) : helper ? (
        <span id={`${id}-helper`} className={styles.helper}>
          {helper}
        </span>
      ) : null}
    </div>
  );
}
