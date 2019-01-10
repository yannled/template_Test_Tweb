
import React, { Component } from 'react';
import Routes from './routes';
import Layout from './components/Layout';
import AuthProvider from './components/AuthProvider';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthProvider>
    );
  }
}

export default App;
