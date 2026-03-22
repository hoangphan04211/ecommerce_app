import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="StartScreen" />
            <Stack.Screen name="RegisterScreen" />
            <Stack.Screen name="LoginScreen" />
            <Stack.Screen name="PasswordScreen" />
            <Stack.Screen name="RecoveryScreen" />
            <Stack.Screen name="NewPasswordScreen" />
        </Stack>
    );
}
