import React, { useState, useEffect, useContext } from 'react'
import { CountryRegionData } from 'react-country-region-selector'
import { AppContext } from '../..'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import axios from "axios"

const RegionCountry = () => {
  const { info, setInfo } = useContext(AppContext),
    countries = CountryRegionData.map((country) => country[0]),
    [country, setCountry] = useState('Philippines'),
    [region, setRegion] = useState(''),
    [provinces, setProvinces] = useState([]),
    [regionIndex, setRegionIndex] = useState(
      CountryRegionData.map((countryData, i) =>
        countryData[0].match(country) ? i : null,
      ).filter((n) => n != null)[0],
    ),
    regionInput = (countrySelected) => {
      const index = CountryRegionData.map((countryData, i) =>
        countryData[0].match(countrySelected) ? i : null,
      ).filter((n) => n != null)[0]
      setRegionIndex(index)
    },
    getProvinces = () => {
      axios({
        method: 'get',
        url: `https://hotelreservations.ph/gpDBProcess/process.php?request=getCityProvince`,
      }).then((r) => {
        setProvinces(r.data.data[0].listData)
      })
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

  useEffect(() => {
    getProvinces();
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              label="Country"
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
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth>
            <InputLabel id="region">Region*</InputLabel>
            <Select
              labelId="region"
              label="Region*"
              value={region}
              fullWidth
              onChange={(selectedRegion) => {
                setRegion(selectedRegion.target.value)
              }}
            >
              {
                country.match("Philippines") ?
                  provinces.map(province => <MenuItem value={province[0]}>
                    {province[0]}
                  </MenuItem>
                  )
                  :
                  CountryRegionData[regionIndex][2].split('|').map((region) => (
                    <MenuItem value={region.split('~')[0]}>
                      {region.split('~')[0]}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
export default RegionCountry
