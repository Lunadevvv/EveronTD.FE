import { ArrowRight } from "lucide-react";

import styles from "./ArrowLink.module.css";

export default function ArrowLink({ children, href = "#products" }) {
  return (
    <a className={styles.link} href={href}>
      {children}
      <span className={styles.icon}>
        <ArrowRight size={17} />
      </span>
    </a>
  );
}
