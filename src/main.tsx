import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "./styles/reset.css";
import "./styles/index.css";
import styles from "./main.module.css";

import { NewRecipeView } from "./views/new-recipe";

const MENU_LINKS = [
  {
    name: "Create recipe",
    icon: "circle-plus",
    path: "/new"
  },
  {
    name: "Cost Calculator",
    icon: "chart-line",
    path: "/cost-calculator"
  }
];

function App() {
  return (
    <LocationProvider>
      <div class={styles.wrapper}>
        <aside class={styles.sidebarContent}>
          <ul class="sidebarPane">
            {MENU_LINKS.map((link) => {
              const iconHref = `/ui.svg#${link.icon}`;

              return (
                <li key={link.name} class="sidebarPaneItem">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <use href={iconHref} />
                  </svg>
                  <a href={link.path}>{link.name}</a>
                </li>
              );
            })}
          </ul>
        </aside>

        <main>
          <Router>
            {/* @ts-ignore */}
            <Route path="/new" component={NewRecipeView} />
          </Router>
        </main>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.querySelector("#root")!);
