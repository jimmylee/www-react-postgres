import * as React from "react";
import * as Actions from "@common/actions";
import * as Strings from "@common/strings";

import styles from "@scenes/SceneHome.module.scss";

import Header from "@components/Header";
import Layout from "@components/Layout";
import LayoutLeft from "@components/LayoutLeft";
import LayoutRight from "@components/LayoutRight";
import LineItem from "@components/LineItem";
import StatePreview from "@components/StatePreview";
import Content from "@components/Content";
import Input from "@components/Input";
import Button from "@components/Button";
import Tip from "@components/Tip";

import H1 from "@components/H1";
import H2 from "@components/H2";
import P from "@components/P";

const handleChange = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value });
};

function SceneHome(props) {
  const [state, setState] = React.useState({ email: "", password: "" });

  let maybeRenderGoogleAuth =
    !props.viewer && !Strings.isEmpty(props.googleURL);
  if (
    props.viewer &&
    !Strings.isEmpty(props.googleURL) &&
    props.viewer.data &&
    !props.viewer.data.google
  ) {
    maybeRenderGoogleAuth = true;
  }

  return (
    <section className={styles.scene}>
      <Header>
        <Content>
          <H1>www-react-postgres 0.1</H1>
        </Content>
      </Header>
      <Layout>
        <LayoutLeft>
          {props.viewer && (
            <React.Fragment>
              <LineItem>
                <Content>
                  <H2>Sign out</H2>

                  <P>
                    This method will delete string that holds the JWT in the
                    cookie. To authenticate again you will need to sign in.
                  </P>

                  <Button
                    onClick={() => Actions.execute("SIGN_OUT")}
                    style={{ background: `var(--color-warning)` }}
                  >
                    Sign out
                  </Button>
                </Content>
              </LineItem>
              <LineItem>
                <Content>
                  <H2>Delete Account</H2>

                  <P>
                    This method will delete the user entry from the user table,
                    if they are part of an organization this will delete the
                    user from the organization but will not delete the
                    organization even if its empty.
                  </P>

                  <Button
                    onClick={() => Actions.execute("VIEWER_DELETE_USER")}
                    style={{ background: `var(--color-failure)` }}
                  >
                    Delete {props.viewer.id}
                  </Button>
                </Content>
              </LineItem>
            </React.Fragment>
          )}
          {!props.viewer && (
            <LineItem>
              <Content>
                <H2>Sign in</H2>

                <P>
                  This is a traditional sign in, if an account exists it will
                  check if the credentials are correct, if the account doesn't
                  it will make a new user entry in our Postgres database. There
                  is no way to verify if you are the owner of this e-mail.
                </P>

                <Input
                  autoComplete="off"
                  value={state.email}
                  placeholder="someone@something.com"
                  name="email"
                  onChange={(e) => handleChange(e, state, setState)}
                />
                <Input
                  style={{ marginTop: 12, marginBottom: 24 }}
                  autoComplete="off"
                  value={state.password}
                  name="password"
                  placeholder="Enter a password"
                  type="password"
                  onChange={(e) => handleChange(e, state, setState)}
                />
                <Button onClick={() => Actions.execute("SIGN_IN", state)}>
                  Continue
                </Button>
              </Content>
            </LineItem>
          )}

          {maybeRenderGoogleAuth && (
            <LineItem>
              <Content>
                <H2>Sign in with Google</H2>

                <P>
                  This is a traditional Google sign in, the client ID and client
                  secret are provided by Google, unlike the local authentication
                  we can verify that you are the owner of the e-mail. This can
                  act as a form of e-mail verification if you don't want to
                  manually do it.
                </P>

                <Button href={props.googleURL}>Continue to Google</Button>
              </Content>
            </LineItem>
          )}

          {props.state.isMetamaskEnabled && !window.ethereum.selectedAddress ? (
            <LineItem>
              <Content>
                <H2>Connect Metamask to {props.host}</H2>
                <P>
                  You have metamask installed, a user can now click the button
                  below to connect their Ethereum address to this site. This
                  example service will also create an Ethereum address entry in
                  the Postgres table.
                </P>
                <Button
                  onClick={() =>
                    Actions.execute("VIEWER_CONNECT_METAMASK", state)
                  }
                >
                  Connect Metamask
                </Button>
              </Content>
            </LineItem>
          ) : (
            <LineItem>
              <Content>
                <H2>
                  Metamask is connected and an ethereum address is selected.
                </H2>
                <P>
                  There is nothing left to do. As a developer you could write
                  some code that would associate the Ethereum address with the
                  locally authenticated account. Common advice is to wait for a
                  need to do that.
                </P>
                <P>
                  From this point on you can build your dApp like a minting
                  service or DAO.
                </P>
              </Content>
            </LineItem>
          )}

          {!props.state.isMetamaskEnabled && (
            <LineItem>
              <Content>
                <H2>Install Metamask</H2>
                <Button href="https://metamask.io/">Visit metamask.io</Button>
              </Content>
            </LineItem>
          )}
        </LayoutLeft>
        <LayoutRight>
          {props.state.isMetamaskEnabled && window.ethereum.selectedAddress ? (
            <Tip>Metamask ➝ {window.ethereum.selectedAddress}</Tip>
          ) : null}

          {props.state.isMetamaskEnabled && props.state.ethereum && (
            <Tip>
              Ethereum address {props.state.ethereum.address} has reference data
              in this server's database
            </Tip>
          )}

          {props.viewer && props.viewer.data.verified && (
            <Tip>{props.viewer.email} is verified</Tip>
          )}

          {props.viewer && props.viewer.data.google && (
            <Tip style={{ background: `var(--color-primary)` }}>
              {props.viewer.email} is google authenticated
            </Tip>
          )}

          {props.viewer && !props.viewer.data.verified && (
            <Tip style={{ background: `var(--color-warning)` }}>
              {props.viewer.email} is not verified
            </Tip>
          )}
          <StatePreview state={props} />
        </LayoutRight>
      </Layout>
    </section>
  );
}

export default SceneHome;
