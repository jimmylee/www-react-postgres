import styles from "@components/LineItem.module.scss";

function LineItem(props) {
  return <div className={styles.item}>{props.children}</div>;
}

export default LineItem;
