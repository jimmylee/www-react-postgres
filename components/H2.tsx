import styles from "@components/H2.module.scss";

function H2(props) {
  return (
    <h2 className={styles.heading} {...props}>
      {props.children}
    </h2>
  );
}

export default H2;
