import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { MeComponent } from "../generated/apolloComponents";
// import styled from "styled-components";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/hello">
          <a>Hello</a>
        </Link>{" "}
        |{" "}
        <Link href="/login">
          <a>Login</a>
        </Link>{" "}
        |{" "}
        <Link href="/register">
          <a>Register</a>
        </Link>{" "}
        |{" "}
        <MeComponent>
          {({ data, loading }) => {
            if (!data || loading || !data.me) {
              return null;
            }
            return (
              <React.Fragment>
                <Link href="/logout">
                  <a>logout</a>
                </Link>{" "}
                |{" "}
                <Link href="/forgot-password">
                  <a>forgot password</a>
                </Link>{" "}
                |{" "}
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </React.Fragment>
            );
          }}
        </MeComponent>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
