import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./contexts/authContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <AuthProvider>
      <Analytics />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
