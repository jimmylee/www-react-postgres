import * as React from "react";
import * as Actions from "@common/actions";

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

import H1 from "@components/H1";
import H2 from "@components/H2";

const handleChange = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value });
};

function SceneHome(props) {
  const [state, setState] = React.useState({ email: "", password: "" });

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
                  <Button onClick={() => Actions.execute("SIGN_OUT")}>
                    Continue
                  </Button>
                </Content>
              </LineItem>
              <LineItem>
                <Content>
                  <H2>Delete Account</H2>
                  <Button onClick={() => Actions.execute("VIEWER_DELETE_USER")}>
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
          {!props.viewer && props.googleURL && (
            <LineItem>
              <Content>
                <H2>Sign in with Google</H2>
                <Button href={props.googleURL}>Continue</Button>
              </Content>
            </LineItem>
          )}
        </LayoutLeft>
        <LayoutRight>
          <StatePreview state={props} />
        </LayoutRight>
      </Layout>
    </section>
  );
}

export default SceneHome;
