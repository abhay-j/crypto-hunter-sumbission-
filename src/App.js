import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { makeStyles } from "@material-ui/core/styles";
import CryptoContext from "./contexts/CryptoContext";
const useStyles = makeStyles({
  app: {
    backgroundColor: "#14161a",
    color: "white",
    height: "100vh",
  },
});
function App() {
  const classes = useStyles();
  return (
    <Router>
      <CryptoContext>
        <div className={classes.app}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/coins/:id" component={CoinPage} />
          </Switch>
        </div>
      </CryptoContext>
    </Router>
  );
}

export default App;
