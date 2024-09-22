import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

import { LoginProvider } from "./contexts/LoginContext";

import { StackHolder } from "./StackHolder/stackHolder";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        {/* untuk Handle semua halaman menggunakan Stack */}
        <StackHolder />
      </LoginProvider>
    </ApolloProvider>
  );
}
