import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Pressable,
} from "react-native";
import { COLOR } from "@/assets/colors/Colors";

const AuthInputField = ({
  label,
  value,
  style,
  isError,
  helperText,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabelStyle = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabelStyle, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (value === "") {
      if (!value) {
        Animated.timing(animatedLabelStyle, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
    setIsFocused(false);
  };

  const labelStyle = {
    position: "absolute",
    left: 15,
    top: animatedLabelStyle.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8],
    }),
    fontSize: animatedLabelStyle.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isError ? COLOR.secondary_red_100 : COLOR.primary_blue_100,
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          isError && styles.inputError,
          { paddingBottom: value || isFocused ? 0 : 15 },
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {helperText && (
        <Text style={[styles.helper, isError && styles.error]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    width: "100%",
    height: 56, //setting this make the label which has an absolute position to be at the center of the input when using IOS and a bit lower when using Android
    padding: 15,
    fontSize: 16,
    color: COLOR.primary_blue_100,
    borderWidth: 1,
    borderColor: COLOR.primary_blue_50,
    borderRadius: 10,
  },

  inputFocused: {
    borderColor: COLOR.primary_blue_100,
  },

  inputError: {
    borderColor: COLOR.secondary_red_100,
  },

  helper: {
    marginTop: 4,
    marginLeft: 15,
    fontSize: 14,
    color: COLOR.primary_blue_50,
  },

  error: {
    color: COLOR.secondary_red_100,
  },
});

export default AuthInputField;
