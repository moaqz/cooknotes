import { render } from "preact";
import { LocationProvider, Router, Route, lazy } from "preact-iso";
import "@moaqzdev/toast";

import "./styles/reset.css";
import "./styles/index.css";

import { RecipeList } from "./components/recipe-list";
import { TitleBar } from "./components/title-bar";

const NewRecipeView = lazy(() => import("~/views/new-recipe").then((m) => m.NewRecipeView));
const RecipeView = lazy(() => import("~/views/recipe").then((m) => m.RecipeView));
const WelcomeView = lazy(() => import("~/views/welcome").then((m) => m.WelcomeView));
const EditRecipeView = lazy(() => import("~/views/edit-recipe").then(m => m.EditRecipeView));

function App() {
  return (
    <LocationProvider>
      <section class="menubar">
        <RecipeList />
      </section>

      <div class="page">
        <TitleBar />
        <main>
          <Router>
            <Route path="/new" component={NewRecipeView} />
            <Route path="/recipes/:id" component={RecipeView} />
            <Route path="/recipes/:id/edit" component={EditRecipeView} />
            <Route component={WelcomeView} default />
          </Router>
        </main>
      </div>
      <moaqz-toaster dismissable />
    </LocationProvider>
  );
}

render(<App />, document.querySelector("#root")!);
