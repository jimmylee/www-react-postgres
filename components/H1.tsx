import styles from "@components/H1.module.scss";

function H1(props) {
  return (
    <h1 className={styles.heading} {...props}>
      {props.children}
    </h1>
  );
}

export default H1;
