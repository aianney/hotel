import React, { useState, useEffect, useContext, useRef } from 'react'
import { TextField, Grid } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import { AppContext } from '../..'
import './birthdate.styles.css'

const Birthdate = (props) => {
  const isInitialMount = useRef(true),
    { info, setInfo } = useContext(AppContext),
    date = new Date(),
    startDate = date.setFullYear(date.getFullYear() - 18),
    [birthdate, setBirthdate] = useState(info.guestDetails.birthdate? info.guestDetails.birthdate : null),
    [birthdateOpen, setBirthdateOpen] = useState(false),
    updateBirthday = () => {
      setInfo({
        ...info,
        guestDetails: {
          ...info.guestDetails,
          birthdate,
        },
      })
    }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      updateBirthday()
    }
    // eslint-disable-next-line
  }, [birthdate])

  return (
    <LocalizationProvider
      dateAdapter={DateFnsUtils}
    // style={{ width: '100%' }}
    >
      <MobileDatePicker
        // style={{ width: '100%', borderRadius: '20' }}
        showToolbar={false}
        onChange={() => { }}
        onAccept={(newValue) => {
          setBirthdate(newValue)
        }}
        onClose={() => setBirthdateOpen(false)}
        open={birthdateOpen}
        maxDate={startDate}
        openTo="year"
        views={['year', 'month', 'day']}
        // eslint-disable-next-line
        renderInput={({
          ref,
          inputProps,
          disabled,
          onChange,
          value,
          ...other
        }) => (
          <Grid ref={ref} {...other} item>
            <TextField
              fullWidth
              helperText={props.errorBirthday}
              error={props.errorBirthday}
              variant="outlined"
              label="Birthday*"
              readOnly
              ref={ref}
              onChange={onChange}
              value={!birthdate ? "" : moment(birthdate).format('MMMM DD, YYYY')}
              onClick={() => { setBirthdateOpen(true); birthdate ? setBirthdate(birthdate) : setBirthdate(date.setFullYear(date.getFullYear())) }}
              sx={{
                borderRadius: '4px',
              }}
            />
          </Grid>
        )}
        value={birthdate}
      />
    </LocalizationProvider>
  )
}

export default Birthdate
