import styles from "@components/Input.module.scss";

function Input(props) {
  return (
    <input className={styles.input} {...props}>
      {props.children}
    </input>
  );
}

export default Input;
