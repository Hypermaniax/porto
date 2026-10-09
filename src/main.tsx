import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ContentProvider from "@/data/content-provider"
import ThemeProvider from "@/components/ThemeProvider"
import "./index.css"
import App from "./App.tsx"

// router data (createBrowserRouter) supaya useBlocker tersedia:
// dipakai tirai perpindahan halaman di App.
const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <ThemeProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ThemeProvider>
    ),
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

