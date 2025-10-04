import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const CustomButton = ({title, onPress, loading = false, disabled = false}) => (
  <TouchableOpacity
    style={[GlobalStyles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled || loading}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={title}>
    {loading ? (
      <ActivityIndicator color={Colors.text.light} />
    ) : (
      <Text style={GlobalStyles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.border,
  },
});

export default CustomButton;