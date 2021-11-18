import React, { useState } from 'react'
import { TextField, Grid } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import Theme from '../../theme/theme.component'
import './birthdate.styles.css'

const Birthdate = () => {
  const [birthdate, setBirthdate] = useState(new Date())
  const [birthdateOpen, setBirthdateOpen] = useState(false)
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <MobileDatePicker
        showToolbar={false}
        onChange={() => {}}
        onAccept={(newValue) => {
          setBirthdate(newValue)
        }}
        onClose={() => setBirthdateOpen(false)}
        open={birthdateOpen}
        maxDate={new Date()}
        openTo="year"
        views={['year', 'month', 'day']}
        // eslint-disable-next-line
        open={birthdateOpen}
        renderInput={({
          ref,
          inputProps,
          disabled,
          onChange,
          value,
          ...other
        }) => (
          <Grid ref={ref} {...other}>
            <TextField
              sx={{ borderRadius: Theme.shape.borderRadiusSm }}
              variant="outlined"
              readOnly
              ref={ref}
              onChange={onChange}
              value={moment(birthdate).format('MMMM DD, YYYY')}
              onClick={() => setBirthdateOpen(true)}
            />
          </Grid>
        )}
        value={birthdate}
      />
    </LocalizationProvider>
  )
}

export default Birthdate
