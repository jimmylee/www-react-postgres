import styles from "@components/Layout.module.scss";

function Layout(props) {
  return <div className={styles.layout}>{props.children}</div>;
}

export default Layout;
