import { useRef } from "react";

import styles from "../Auth.module.css";

export default function OtpInput({ value, onChange, invalid }) {
  const inputRef = useRef(null);
  const code = value.join("");

  const updateCode = (nextValue) => {
    const sanitized = nextValue.replace(/\D/g, "").slice(0, 6);
    onChange(Array.from({ length: 6 }, (_, index) => sanitized[index] || ""));
  };

  return (
    <div
      className={`${styles.otp} ${invalid ? styles.otpInvalid : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        className={styles.otpNativeInput}
        id="verification-code"
        name="verificationCode"
        type="text"
        value={code}
        aria-label="Mã xác thực gồm 6 chữ số"
        aria-invalid={invalid}
        aria-describedby={invalid ? "otp-error" : undefined}
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={6}
        autoFocus
        onChange={(event) => updateCode(event.target.value)}
        onPaste={(event) => {
          event.preventDefault();
          updateCode(event.clipboardData.getData("text"));
        }}
      />
      <div className={styles.otpSlots} aria-hidden="true">
        {value.map((digit, index) => (
          <span
            key={index}
            className={`${styles.otpSlot} ${index === code.length && code.length < 6 ? styles.otpSlotActive : ""}`}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
