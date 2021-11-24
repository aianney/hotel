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
    [birthdate, setBirthdate] = useState(date.setFullYear(date.getFullYear() - 18)),
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
        maxDate={birthdate}
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
              value={isInitialMount.current ? "" : moment(birthdate).format('MMMM DD, YYYY')}
              onClick={() => setBirthdateOpen(true)}
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
