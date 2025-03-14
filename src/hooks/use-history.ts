import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";

export function useHistory() {
  const { path, route } = useLocation();
  const [historyStack, setHistoryStack] = useState([path]);
  const [historyIndex, setHistoryIndex] = useState(0);

  /**
   * Update the history stack when the route changes.
   * Ensures that future routes are removed and the stack reflects the user's actual navigation path.
   *
   * @example
   * Initial stack: ["/home", "/about", "/contact"]
   * Navigate back to `/about`, then navigate to `/settings`.
   * Updated stack: ["/home", "/about", "/settings"]
   */
  useEffect(() => {
    const isSameRoute = historyStack[historyIndex] === path;

    if (!isSameRoute) {
      setHistoryStack((prevStack) => {
        const updatedStack = prevStack.slice(0, historyIndex + 1);
        updatedStack.push(path);
        return updatedStack;
      });

      setHistoryIndex((prevIndex) => prevIndex + 1);
    }
  }, [path]);

  const goBackward = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      route(historyStack[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < historyStack.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      route(historyStack[historyIndex + 1]);
    }
  };

  return {
    canGoBackward: historyIndex > 0,
    canGoForward: historyIndex < historyStack.length - 1,
    goBackward,
    goForward,
  };
}
