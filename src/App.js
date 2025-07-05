import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./contexts/authContext"; // ✅ Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap your router with AuthProvider */}
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
