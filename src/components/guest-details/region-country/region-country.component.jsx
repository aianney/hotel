import React from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import {
  // Box,
  // Card,
  // CardContent,
  Grid,
  // TextField,
  // Typography,
} from '@material-ui/core'
import './region-country.styles.css'

class RegionCountry extends React.Component {
  constructor(props) {
    super(props)
    this.state = { country: '', region: '' }
  }

  selectCountry(val) {
    this.setState({ country: val })
  }

  selectRegion(val) {
    this.setState({ region: val })
  }

  render() {
    const { country, region } = this.state
    return (
      <>
        <Grid container spacing={1} ml={-1}>
          <Grid xs={12} item>
            <CountryDropdown
              // p={5}
              style={{ width: '100%', paddingTop: '24' }}
              value={country}
              fullWidth
              onChange={(val) => this.selectCountry(val)}
            />
          </Grid>
          <Grid xs={12} item>
            <RegionDropdown
              style={{ width: '100%' }}
              country={country}
              value={region}
              fullWidth
              variant="outlined"
              onChange={(val) => this.selectRegion(val)}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}
export default RegionCountry
