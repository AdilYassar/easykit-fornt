import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors, Fonts } from '@utils/Constants';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const CustomButton: FC<CustomButtonProps> = ({ title, onPress, isLoading = false, disabled = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : {}, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
});

export default CustomButton;
