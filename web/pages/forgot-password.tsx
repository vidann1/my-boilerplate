import React from "react";
import Layout from "../components/Layout";

import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import { ForgotPasswordComponent } from "../generated/apolloComponents";
import Router from "next/router";

export default () => {
  return (
    <Layout title="Forgot Password">
      <ForgotPasswordComponent>
        {forgotPassword => (
          <Formik
            onSubmit={async data => {
              const response = await forgotPassword({
                variables: data
              });
              console.log(response);
              Router.push("/check-email");
            }}
            initialValues={{
              email: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <button type="submit">Reset Password</button>
              </form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    </Layout>
  );
};
