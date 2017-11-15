import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import axios from 'axios';
import Home from './pages/home';
import Articles from './pages/articles';
import Webs from './pages/articles/webview';

const App = () => {
  axios.defaults.baseURL = 'https://newsapi.org/v1';
  axios.interceptors.request.use(function (config, params) {
    if (config.url.indexOf('?') > -1) {
      config.url += `&apiKey=5a7102ce50c04bea964c4077454cdd82`;
    } else {
      config.url += `?apiKey=5a7102ce50c04bea964c4077454cdd82`;
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  return (
    <Router>
      <Stack key="root">
        <Scene
          hideNavBar={true}
          key="home"
          component={Home}
          initial={true}
          title="News Sources"
        />
        <Scene
          hideNavBar={true}
          key="articles"
          component={Articles}
          title="Article"
        />
        <Scene
          hideNavBar={true}
          key="web"
          component={Webs}
          title="Web"
        />
      </Stack>
    </Router>
  );
}

export default App;
