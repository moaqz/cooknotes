import { render } from "preact";
import { LocationProvider, Router, Route, lazy } from "preact-iso";

import "./styles/reset.css";
import "./styles/index.css";

import { RecipeList } from "./components/recipe-list";
import { AppDetails } from "./components/app-details";
import { TitleBar } from "./components/title-bar";

const RecipeView = lazy(() => import("~/views/new-recipe").then((m) => m.NewRecipeView));
const NotFoundView = lazy(() => import("~/views/not-found").then((m) => m.NotFoundView));

function App() {
  return (
    <LocationProvider>
      <div class="wrapper">
        <aside class="sidebarContent">
          <RecipeList />
          <AppDetails />
        </aside>

        <div>
          <TitleBar />
          <main>
            <Router>
              <Route path="/new" component={RecipeView} />
              <Route component={NotFoundView} default />
            </Router>
          </main>
        </div>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.querySelector("#root")!);
