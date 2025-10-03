import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./features/AppContent";
import { ThemeProvider } from "./app/ThemeContext";
import { VerifyContextProvider } from "./app/VerifyContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <VerifyContextProvider>
        <Router>
          <AppContent />
        </Router>
      </VerifyContextProvider>
    </ThemeProvider>
  );
}

export default App;
