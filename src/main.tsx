import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "./styles/reset.css";
import "./styles/index.css";

import { NewRecipeView } from "./views/new-recipe";
import { RecipeList } from "./components/recipe-list";
import { AppDetails } from "./components/app-details";
import { TitleBar } from "./components/title-bar";

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
              {/* @ts-ignore */}
              <Route path="/new" component={NewRecipeView} />
            </Router>
          </main>
        </div>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.querySelector("#root")!);
