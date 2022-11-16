import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Test from "./components/Test";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Test />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
export default App;
