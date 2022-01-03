import styles from "@components/StatePreview.module.scss";

function StatePreview(props) {
  return (
    <pre className={styles.preview}>{JSON.stringify(props.state, null, 2)}</pre>
  );
}

export default StatePreview;
