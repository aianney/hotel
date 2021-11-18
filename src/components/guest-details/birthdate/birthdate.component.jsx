import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import './birthdate.styles.css'

const Birthdate = () => {
  const [birthdate, setBirthdate] = useState(new Date())
  const [birthdateOpen, setBirthdateOpen] = useState(false)
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <MobileDatePicker
        style={{ borderRadius: '4' }}
        showToolbar={false}
        minDate={new Date()}
        onChange={() => {}}
        onAccept={(newValue) => {
          setBirthdate(newValue)
        }}
        onClose={() => setBirthdateOpen(false)}
        open={birthdateOpen}
        renderInput={({
          ref,
          inputProps,
          disabled,
          onChange,
          value,
          ...other
        }) => (
          <div ref={ref} {...other}>
            <TextField
              variant="outlined"
              readOnly
              ref={ref}
              onChange={onChange}
              value={moment(birthdate).format('MMMM DD, YYYY')}
              onClick={() => setBirthdateOpen(true)}
            />
          </div>
        )}
        value={birthdate}
      />
    </LocalizationProvider>
  )
}

export default Birthdate
