import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.config.productionTip = false

const httpLink = createHttpLink({
  uri: 'https://useful-wallaby-73.hasura.app/v1/graphql'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
