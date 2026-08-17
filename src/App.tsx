import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { RestaurantProvider } from "./context/RestaurantContext";

function App() {
  return (
    <RestaurantProvider>
      <RouterProvider router={routes} />
    </RestaurantProvider>
  );
}

export default App;