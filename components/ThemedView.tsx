import { View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export type ThemedViewProps = ViewProps & {
    light?: string;
    dark?: string;
}

export function ThemedView({ style, light, dark, ...otherProps }: ThemedViewProps) {
    const { colors } = useTheme()
    const backgroundColor = colors.background

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}