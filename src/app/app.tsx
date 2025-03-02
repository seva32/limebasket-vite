import AppRouter from "./appRouter";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

import storeConfig from "../store";

const { store, persistor } = storeConfig;

export function App() {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
}

export default App;
