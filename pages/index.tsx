import styles from "@components/index.module.scss";

import * as React from "react";
import * as NodeAuth from "@data/node-authentication";
import * as NodeGoogle from "@data/node-google";

import SceneHome from "@scenes/SceneHome";
import App from "@components/App";

function IndexPage(props) {
  return (
    <App
      title="www-react-postgres 0.1"
      description="This is a website template for an example website"
      url=""
    >
      <SceneHome viewer={props.viewer} googleURL={props.googleURL} />
    </App>
  );
}

export async function getServerSideProps(context) {
  const { viewer } = await NodeAuth.getViewer(context.req);
  const { googleURL } = await NodeGoogle.generateURL();

  return {
    props: { viewer, googleURL },
  };
}

export default IndexPage;
