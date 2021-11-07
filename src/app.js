import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppContext, NavBar, Store, Theme } from './components'
import {
  ContactUs,
  Intro,
  GuestDetails,
  PageNotFound,
  Payment,
  RoomAmenities,
  RoomSelection,
} from './pages'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@material-ui/core'
import './app.css'

const App = () => {
  const [info, setInfo] = useState(Store),
    value = useMemo(() => ({ info, setInfo }), [info, setInfo])

  return (
    <ThemeProvider theme={Theme}>
      <Box pt={8} sx={{ backgroundColor: Theme.palette.light.main }}>
        <Router>
          <AppContext.Provider value={value}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Intro} />
              <Route exact path="/room-selection" component={RoomSelection} />
              <Route
                exact
                path="/room-selection/:id"
                component={RoomAmenities}
              />
              <Route exact path="/guest-details" component={GuestDetails} />
              <Route exact path="/payments" component={Payment} />
              <Route path="/contact-us" component={ContactUs} />
              <Route component={PageNotFound} />
            </Switch>
          </AppContext.Provider>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
