import styles from "@components/Button.module.scss";

import * as Strings from "@common/strings";

function Button(props) {
  if (!Strings.isEmpty(props.href)) {
    return (
      <a className={styles.button} {...props}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
