import React, { useState, useEffect, useContext } from 'react'
import { CountryRegionData } from 'react-country-region-selector'
import { AppContext } from '../..'
import { Grid, Select, MenuItem } from '@material-ui/core'

const RegionCountry = () => {
  const { info, setInfo } = useContext(AppContext),
    countries = CountryRegionData.map((country) => country[0]),
    [country, setCountry] = useState('Philippines'),
    [region, setRegion] = useState(''),
    [regionIndex, setRegionIndex] = useState(175),
    regionInput = (countrySelected) => {
      const index = CountryRegionData.map((countryData, i) =>
        countryData[0].match(countrySelected) ? i : null,
      ).filter((n) => n != null)[0]
      setRegionIndex(index)
    }

  useEffect(() => {
    setInfo({
      ...info,
      guestDetails: {
        ...info.guestDetails,
        country: country,
        region: '',
      },
    })
    // eslint-disable-next-line
  }, [country])

  useEffect(() => {
    setInfo({
      ...info,
      guestDetails: {
        ...info.guestDetails,
        region: region,
      },
    })
    // eslint-disable-next-line
  }, [region])

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} item>
          <Select
            value={country}
            fullWidth
            onChange={(selectedCountry, i) => {
              setCountry(selectedCountry.target.value)
              regionInput(selectedCountry.target.value)
            }}
          >
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Select
            value={region}
            fullWidth
            onChange={(selectedRegion) => {
              setRegion(selectedRegion.target.value)
            }}
          >
            {CountryRegionData[regionIndex][2].split('|').map((region) => (
              <MenuItem value={region.split('~')[0]}>
                {region.split('~')[0]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </>
  )
}
export default RegionCountry
