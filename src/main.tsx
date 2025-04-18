import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "@/app/App"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      {/*<AppHttpRequests />*/}
    </Provider>
  </BrowserRouter>,
)
