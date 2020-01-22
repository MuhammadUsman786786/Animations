import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import RoundButtonList from './Containers/RoundButtonList';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <RoundButtonList />
      </SafeAreaView>
    </>
  );
};

export default App;
