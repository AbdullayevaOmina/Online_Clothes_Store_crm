import { Outlet } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      
     <Outlet/>
    </ThemeProvider>
    </>
  )
}

export default App
