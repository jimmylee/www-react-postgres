import styles from "@components/P.module.scss";

function P(props) {
  return (
    <p className={styles.paragraph} {...props}>
      {props.children}
    </p>
  );
}

export default P;
