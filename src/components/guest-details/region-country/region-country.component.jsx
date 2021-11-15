import React from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
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
      <div className="region-country">
        <CountryDropdown
          // sx={{ borderRadius: Theme.shape.borderRadiusSm }}
          value={country}
          onChange={(val) => this.selectCountry(val)}
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)}
        />
      </div>
    )
  }
}
export default RegionCountry
