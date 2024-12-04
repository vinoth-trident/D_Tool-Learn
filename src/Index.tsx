import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import { COLORS } from './styles/CommonStyle';
import App from './App';

export default function Index(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <App />
    </Provider>
  );
}
