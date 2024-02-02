/*** APP ***/
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useLazyQuery,
} from "@apollo/client";
import { GraphQLID } from "graphql";

import { link } from "./link.js";
import { Subscriptions } from "./subscriptions.jsx";
import { Layout } from "./layout.jsx";
import "./index.css";

const ALL_PEOPLE = gql`
  query AllPeople ($id: ${GraphQLID}) {
    people (id: $id) {
      id
      name
    }
  }
`;

let counterFn = 0;
let counterQuery = 0;

function App() {
  const [getData] = useLazyQuery(ALL_PEOPLE, {
    onCompleted(data) {
      console.log("COMPLETED QUERY: ", ++counterQuery);
    },
  });

  useEffect(() => {
    console.log("USE FUNCTION: ", ++counterFn);
    getData({
      variables: {
        id: 1,
        name: "name",
      },
    });
    setTimeout(() => {
      console.log("USE FUNCTION: ", ++counterFn);
      getData({ variables: { id: 2 } });
    }, 3000);
  }, [getData]);

  return <main></main>;
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="subscriptions-wslink" element={<Subscriptions />} />
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>,
);
