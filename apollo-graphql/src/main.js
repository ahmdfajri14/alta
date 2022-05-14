import {ApolloClient, HttpLink, InMemoryCache, split} from "apollo-boost";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: "https://useful-wallaby-73.hasura.app/v1/graphql",
});

const wslink = new WebSocketLink({
  uri: "ws://useful-wallaby-73.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
  },
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == "OperationDefinition" &&
      definition.operation == "subscription"
    );
  },
  wslink,
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
new Vue({
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
