import styles from "@components/StatePreview.module.scss";

import H2 from "@components/H2";
import P from "@components/P";

function StatePreview(props) {
  return (
    <section className={styles.preview}>
      <H2>State preview</H2>
      <P>
        A JSON representation of the properties from the server, and the
        properties generated on the client. The benefit of this template is that
        no state management library is necessary. Feel free to add one if you
        like.
      </P>
      <pre className={styles.code}>{JSON.stringify(props.state, null, 2)}</pre>
    </section>
  );
}

export default StatePreview;
