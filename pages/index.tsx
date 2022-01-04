import styles from "@components/index.module.scss";

import * as React from "react";
import * as Requests from "@common/requests";
import * as Strings from "@common/strings";
import * as NodeAuth from "@data/node-authentication";
import * as NodeGoogle from "@data/node-google";

import SceneHome from "@scenes/SceneHome";
import App from "@components/App";

function IndexPage(props) {
  const [state, setState] = React.useState({
    isMetamaskEnabled: false,
    ethereum: null,
  });

  React.useEffect(() => {
    const isMetamaskEnabled =
      typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

    if (!isMetamaskEnabled) {
      return;
    }

    // NOTE(jim): Lazy way to perform updates.
    ethereum.on("accountsChanged", function(accounts) {
      window.location.reload();
    });
  });

  React.useEffect(() => {
    const load = async () => {
      const isMetamaskEnabled =
        typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

      let addressResponse = null;
      if (isMetamaskEnabled) {
        if (!Strings.isEmpty(window.ethereum.selectedAddress)) {
          const response = await Requests.get(
            `/api/ethereum/${window.ethereum.selectedAddress}`
          );

          if (response && response.address) {
            addressResponse = response;
          }
        }
      }

      setState({
        ...state,
        isMetamaskEnabled,
        ethereum: addressResponse,
      });
    };

    load();
  }, []);

  return (
    <App
      title="www-react-postgres 0.1"
      description="This is a website template for an example website"
      url=""
    >
      <SceneHome
        viewer={props.viewer}
        googleURL={props.googleURL}
        state={state}
      />
    </App>
  );
}

export async function getServerSideProps(context) {
  const { viewer } = await NodeAuth.getViewer(context.req);
  const { googleURL } = await NodeGoogle.generateURL();

  return {
    props: { viewer: viewer && viewer.id ? viewer : null, googleURL },
  };
}

export default IndexPage;
