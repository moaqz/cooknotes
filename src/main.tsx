import { render } from "preact";
import { LocationProvider, Router, Route, lazy } from "preact-iso";
import "@moaqzdev/toast";

import "./styles/reset.css";
import "./styles/index.css";

import { RecipeList } from "./components/recipe-list";
import { TitleBar } from "./components/title-bar";
import { Footer } from "./components/footer";
import { AppSettingsProvider } from "~/hooks/context/app-config";

const NewRecipeView = lazy(() => import("~/views/new-recipe").then((m) => m.NewRecipeView));
const RecipeView = lazy(() => import("~/views/recipe").then((m) => m.RecipeView));
const WelcomeView = lazy(() => import("~/views/welcome").then((m) => m.WelcomeView));
const EditRecipeView = lazy(() => import("~/views/edit-recipe").then(m => m.EditRecipeView));
const SettingsView = lazy(() => import("~/views/settings").then(m => m.SettingsView));

function App() {
  return (
    <LocationProvider>
      <AppSettingsProvider>
        <section class="menubar">
          <RecipeList />
          <Footer />
        </section>

        <div class="page">
          <TitleBar />
          <main>
            <Router>
              <Route path="/new" component={NewRecipeView} />
              <Route path="/recipes/:id" component={RecipeView} />
              <Route path="/recipes/:id/edit" component={EditRecipeView} />
              <Route path="/settings" component={SettingsView} />
              <Route component={WelcomeView} default />
            </Router>
          </main>
        </div>
        <moaqz-toaster dismissable />
      </AppSettingsProvider>
    </LocationProvider>
  );
}

render(<App />, document.querySelector("#root")!);
