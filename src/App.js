import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import "./App.css";
import TodoHome from "./containers/AppContainer";
import store from "./redux/store";

function App() {
  require("dotenv").config();

  const theme = createTheme({
    palette: {
      primary: {
        // works
        main: "#165788",
        contrastText: "#fff",
      },
      secondary: {
        // works
        main: "#69BE28",
        contrastText: "#fff",
      },
      companyBlue: {
        // doesnt work - defaults to a grey button
        main: "#65CFE9",
        contrastText: "#fff",
      },
      companyRed: {
        // doesnt work - grey button
        main: "#E44D69",
        contrastText: "#000",
      },
      accent: {
        // doesnt work - grey button
        main: "#cecece", // import purple doesnt work
        contrastText: "#000",
      },
      white: {
        main: "#ffffff", // import purple doesnt work
        contrastText: "#000",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <TodoHome />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
