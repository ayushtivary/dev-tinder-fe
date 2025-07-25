import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppStore from "./Store/AppStore";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
