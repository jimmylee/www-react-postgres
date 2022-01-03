import styles from "@components/LayoutLeft.module.scss";

function LayoutLeft(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default LayoutLeft;
