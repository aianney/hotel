import React, { useContext } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import dataCountries from './data-countries.component'
import { AppContext } from '../..'

const Nationality = () => {
  const { info, setInfo } = useContext(AppContext),
    setNationality = (nationality) =>
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          nationality,
        },
      })

  return (
    <FormControl fullWidth>
      <InputLabel id="nationality">Nationality</InputLabel>
      <Select
        fullWidth
        labelId="nationality"
        label="Nationality"
        onChange={(e) => setNationality(e.target.value)}
      >
        {dataCountries.map((nationality) => (
          <MenuItem value={nationality.label}>
            <Box
              component="img"
              src={`https://flagcdn.com/w20/${nationality.code.toLowerCase()}.png`}
              mr={2}
            />
            {nationality.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default Nationality
