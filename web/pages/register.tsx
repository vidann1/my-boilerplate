import React from "react";
import Layout from "../components/Layout";

import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";

export default () => {
  return (
    <Layout title="Register">
      <RegisterComponent>
        {register => (
          <Formik
            onSubmit={async data => {
              const response = await register({
                variables: {
                  data
                }
              });
              console.log(response);
            }}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="first name"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="last name"
                  component={InputField}
                />
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
                <button type="submit">Register</button>
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};
