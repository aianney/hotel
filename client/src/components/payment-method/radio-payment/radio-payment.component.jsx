import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core'

export default function Checkbox(props) {
  // eslint-disable-next-line
  const { name, label, value, onChange } = props

  // const convertToDefEventPara = (name, value) => ({
  //   target: {
  //     name,
  //     value,
  //   },
  // })

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name=""
            color="primary"
            checked={value}
            // onChange={(e) =>
            //   onChange(convertToDefEventPara(name, e.target.checked))
            // }
          />
        }
        label={label}
      />
    </FormControl>
  )
}
