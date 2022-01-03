import styles from "@components/LayoutRight.module.scss";

function LayoutRight(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default LayoutRight;
