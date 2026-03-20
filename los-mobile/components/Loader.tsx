import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

export default function Loader({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={40} color="#1129BD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
