import styles from "@components/Tip.module.scss";

function Tip(props) {
  return (
    <aside className={styles.tip} {...props}>
      {props.children}
    </aside>
  );
}

export default Tip;
