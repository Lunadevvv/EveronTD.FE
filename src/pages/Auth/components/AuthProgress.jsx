import { Check } from "lucide-react";

import styles from "../Auth.module.css";

const labels = ["Tài khoản", "Xác thực", "Thông tin"];

export default function AuthProgress({ step }) {
  return (
    <ol className={styles.progress} aria-label={`Bước ${step} trên 3`}>
      {labels.map((label, index) => {
        const number = index + 1;
        return (
          <li
            key={label}
            className={number <= step ? styles.progressActive : ""}
            aria-current={number === step ? "step" : undefined}
          >
            <span>
              {number < step ? (
                <Check size={13} aria-hidden="true" />
              ) : (
                `0${number}`
              )}
            </span>
            <small>{label}</small>
          </li>
        );
      })}
    </ol>
  );
}
