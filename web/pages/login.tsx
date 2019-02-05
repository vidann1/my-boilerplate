import React from "react";
import Layout from "../components/Layout";

import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import { LoginComponent } from "../generated/apolloComponents";
import Router from "next/router";

export default () => {
  return (
    <Layout title="Login">
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              // const errors: { [key: string]: string } = {};
              const response = await login({
                variables: data
              });
              console.log(response);
              if (response && response.data && !response.data.login) {
                setErrors({
                  email: "invalid login"
                });
                return;
              }
              Router.push("/");
            }}
            initialValues={{
              email: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">Login</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
