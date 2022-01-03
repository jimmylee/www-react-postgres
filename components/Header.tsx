import styles from "@components/Header.module.scss";

function Header(props) {
  return <header className={styles.header}>{props.children}</header>;
}

export default Header;
