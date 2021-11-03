import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Theme } from './components/components.component'
import {
  ContactUs,
  Intro,
  GuestDetails,
  PageNotFound,
  RoomSelection,
} from './pages/pages.component'
import NavBar from './components/navbar/navbar.component'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@material-ui/core'
import PaymentPage from './pages/paymentpage/paymentpage.component'
// import './assets/scss/index.css';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          backgroundColor: Theme.palette.light.main,
          height: '100vh',
          width: '100vw',
        }}
      >
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Intro} />
            <Route exact path="/room-selection" component={RoomSelection} />
            <Route exact path="/guest-details" component={GuestDetails} />
            <Route exact path="/payments" component={PaymentPage} />
            <Route path="/contact-us" component={ContactUs} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
