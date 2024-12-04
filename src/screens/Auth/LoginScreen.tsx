import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { z } from "zod";
import { COLORS, commonStyles } from "../../styles/CommonStyle";
import AnimatedView from "../../components/AnimatedComponent";
import { setIsLogin } from "../../store/reducers/user";
import { useIsLoggedIn } from "../../store/reducers/actions";
import { useDispatch } from "react-redux";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [policyOpen, setPolicyOpen] = useState<boolean>(true);
  const isLoggedIn = useIsLoggedIn();
  const [isLoginAnim, setIsLoginAnim] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleLogin = () => {
    try {
      // Validate inputs using Zod schema
      loginSchema.parse({ email, password });
      setErrors({}); // Clear errors if validation passes

      setIsLoginAnim(false);
      setTimeout(() => {
        dispatch(setIsLogin(true));
      }, 300);
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Map Zod errors to the state
        const fieldErrors: { email?: string; password?: string } = {};
        e.errors.forEach((error) => {
          if (error.path[0] === "email") fieldErrors.email = error.message;
          if (error.path[0] === "password") fieldErrors.password = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <AnimatedView
        visible={isLoginAnim}
        animationType="slide"
        direction="top"
        duration={300}
      >
        <View
          style={[
            styles.container,
            {
              height: isLoggedIn ? "100%" : "auto",
              justifyContent: isLoggedIn ? "center" : "flex-start",
            },
          ]}
        >
          <View style={{ padding: 40 }}>
            {!isLoggedIn ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/dtools_logo.jpg")}
                  style={styles.logo}
                  alt="Logo"
                />
                <Text style={{ color: COLORS?.white, fontSize: 30 }}>
                  Mobile Install
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{ color: COLORS.white }}>Loading...</Text>
              </View>
            )}
          </View>
          <View style={styles.Arrow} />
        </View>
      </AnimatedView>

      {/* Email & Password Input Fields */}
      {!isLoggedIn && (
        <AnimatedView
          visible={isLoginAnim}
          animationType="slide"
          direction="left"
          duration={300}
        >
          <View style={[styles.box, { padding: "5%", margin: "5%", marginTop: 50 }]}>
            <View>
              <Text style={commonStyles.title}>Sign in</Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Icon name="mail" size={20} color="#333" style={styles.icon} />
                <TextInput
                  style={commonStyles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: undefined })); // Clear email error on input change
                  }}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && (
                <Text style={commonStyles.errorText}>{errors.email}</Text>
              )}

              {/* Password Input */}
              <View style={[styles.inputContainer,{marginTop: 20,}]}>
                <Icon name="lock" size={20} color="#333" style={styles.icon} />
                <TextInput
                  style={commonStyles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: undefined })); // Clear password error on input change
                  }}
                  secureTextEntry
                />
              </View>
              {errors.password && (
                <Text style={commonStyles.errorText}>{errors.password}</Text>
              )}

              {/* Login Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  commonStyles.button,
                  { marginBottom: 20, marginTop: errors.email || errors.password ? 50 : 20 },
                ]}
                onPress={handleLogin}
              >
                <Text style={commonStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedView>
      )}

      {/* Policy Section */}
      {policyOpen && !Boolean(isLoggedIn) && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <AnimatedView
            visible={isLoginAnim}
            animationType="fade"
            direction="left"
            duration={isLoginAnim ? 300 : 300}
            delay={isLoginAnim ? 300 : 0}
          >
            <View
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                position: "relative",
              }}
            >
              <Text style={{ color: COLORS?.white, fontSize: 14 }}>
                D-Tools Mobile Install stores strictly necessary cookies on your
                device. These cookies are used to improve and customize your
                browsing experience. Check our{" "}
                <Text style={{ color: "orange" }}>Privacy Policy</Text>.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPolicyOpen(false)}
              style={{
                position: "absolute",
                zIndex: 3,
                right: 5,
                top: 14,
                cursor: "auto",
              }}
            >
              <Icon name="x" size={15} color="white" style={[styles.icon]} />
            </TouchableOpacity>
          </AnimatedView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS?.primary,
    zIndex: 999,
  },
  logo: {
    width: 140,
    height: 120,
    marginBottom: 20,
  },
  box: {
    backgroundColor: COLORS?.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",

    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  Arrow: {
    position: "absolute",
    bottom: -10,
    zIndex: -1,
    borderColor: COLORS.primary,
    borderWidth: 10,
    transform: [{ rotate: "45deg" }],
  },
});

export default LoginScreen;
