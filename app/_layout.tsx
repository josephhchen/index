import { Stack } from "expo-router";
import { ThemeProvider } from "./contexts/ThemeContext";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  )
}
