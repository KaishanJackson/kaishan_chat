import { router } from "./route"
import './App.css'
import { RouterProvider } from "react-router-dom"
import "./assets/reset.css"
import { store, perStore } from "./store"
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"
import { useEffect } from "react"
import { getUserInfo } from "./api/user"
import GlobalProvider from "./context"


function App() {
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <GlobalProvider>
      <Provider store={store}>
        <PersistGate persistor={perStore}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </GlobalProvider>
  )
}

export default App
