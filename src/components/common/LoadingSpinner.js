import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Colors, GlobalStyles} from '../../styles/globalStyles';

const LoadingSpinner = () => (
  <View style={[GlobalStyles.container, styles.container]}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default LoadingSpinner;