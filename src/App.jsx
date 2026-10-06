import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}