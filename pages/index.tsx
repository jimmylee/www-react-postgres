import styles from "@components/index.module.scss";

import * as React from "react";
import * as Requests from "@common/requests";
import * as Strings from "@common/strings";
import * as Utilities from "@common/utilities";
import * as NodeAuth from "@data/node-authentication";
import * as NodeGoogle from "@data/node-google";

import SceneHome from "@scenes/SceneHome";
import App from "@components/App";

declare const window: any;

function IndexPage(props) {
  const [state, setState] = React.useState({
    ethereum: null,
    solana: null,
    isMetamaskEnabled: false,
    isPhantomEnabled: false,
  });

  React.useEffect(() => {
    const loadWatchers = async () => {
      const { isMetamaskEnabled } = await Utilities.getWalletStatus();

      if (!isMetamaskEnabled) {
        return;
      }

      // TODO(jim): This is lazy. you can find another way.
      window.ethereum.on("accountsChanged", function(accounts) {
        window.location.reload();
      });
    };

    loadWatchers();
  }, []);

  React.useEffect(() => {
    const load = async () => {
      const {
        isMetamaskEnabled,
        isPhantomEnabled,
      } = await Utilities.getWalletStatus();

      // NOTE(jim): The associated Ethereum address
      let ethereumResponse = null;
      if (isMetamaskEnabled) {
        if (!Strings.isEmpty(window.ethereum.selectedAddress)) {
          const eResponse = await Requests.get(
            `/api/ethereum/${window.ethereum.selectedAddress}`
          );

          if (eResponse && eResponse.address) {
            ethereumResponse = eResponse;
          }
        }
      }

      // NOTE(jim): The associated Solana address
      let solanaResponse = null;
      if (isPhantomEnabled && window.solana.publicKey) {
        const solanaAddress = window.solana.publicKey.toString();
        if (!Strings.isEmpty(solanaAddress)) {
          const sResponse = await Requests.get(`/api/solana/${solanaAddress}`);

          if (sResponse && sResponse.address) {
            solanaResponse = sResponse;
          }
        }
      }

      setState({
        ...state,
        isMetamaskEnabled,
        isPhantomEnabled,
        ethereum: ethereumResponse,
        solana: solanaResponse,
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
        host={props.host}
      />
    </App>
  );
}

export async function getServerSideProps(context) {
  const { viewer } = await NodeAuth.getViewer(context.req);
  const { googleURL } = await NodeGoogle.generateURL();

  return {
    props: {
      viewer: viewer,
      host: context.req.headers.host,
      googleURL,
    },
  };
}

export default IndexPage;
