import styles from "@components/StatePreview.module.scss";

import H2 from "@components/H2";
import P from "@components/P";

function StatePreview(props) {
  return (
    <section className={styles.preview}>
      <H2>State preview</H2>
      <P>
        All of the application server side props and client side state to get a
        sense of how this application is organized. The benefit of this template
        is that no state management library is necessary, but you can add one if
        you like.
      </P>
      <pre className={styles.code}>{JSON.stringify(props.state, null, 2)}</pre>
    </section>
  );
}

export default StatePreview;
