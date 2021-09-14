import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import TopBarProgress from "react-topbar-progress-indicator";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

TopBarProgress.config({
  barColors: {
    0: "#0D6EFD",
    1: "#0D6EFD",
  },
});

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<TopBarProgress />}>
        <Switch>
          {routes.map((e) => (
            <Route exact key={e.path} path={e.path} component={e.component} />
          ))}
          <Route component={NotFound}></Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
