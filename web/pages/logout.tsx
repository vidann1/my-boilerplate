import { MyContext } from "../interfaces/MyContext";
import { logoutMutation } from "../graphql/user/mutations/logout";

import redirect from "../lib/redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({ mutation: logoutMutation });

  // Reset store after user logs out
  await apolloClient.resetStore();

  // Redirect to the index page after the user logs out
  redirect(ctx, "/");

  return {};
};

export default Logout;
