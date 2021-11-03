import React, { useState } from 'react'
import {
  Box,
  // Button,
  // ButtonGroup,
  Card,
  Chip,
  // Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  // TextField,
  // Typography,
} from '@material-ui/core'
import { Theme } from '../components.component'

const RoomCard = (props) => {
  const [rate, setRate] = useState(0)

  return (
    <Grid
      item
      xs={props.count > 1 ? 11 : 12}
      sm={6}
      sx={props.disabled ? { opacity: 0.5 } : ''}
    >
      <Card sx={{ backgroundColor: Theme.palette.light.light }}>
        <Box p={3}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <FormControl variant="filled" sx={{ width: '70%' }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={rate}
                  onChange={setRate}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Chip
                label={'₱ ' + 1000}
                sx={{
                  backgroundColor: Theme.palette.secondary.main,
                  color: 'white',
                  fontWeight: Theme.typography.fontWeightBold,
                  borderRadius: Theme.shape.borderRadiusSm,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  )
}

export default RoomCard

// const etc = `        <div className={this.props.length < 2 ? "col-12 col-md-6 py-2" : "col-11 col-md-6 py-2"}>
// <div className={"card bg-white border-radius-lg border-0 " + (this.props.disabled ? "opacity-50" : "")}>
//     <div className={this.props.disabled ? "position-absolute w-100 h-100 top-0 left-0" : ""}></div>
//     <div className="card-body p-3 grid">
//         <div className="row px-3">
//             <div className="col-8 text-center d-flex mb-3">
//                 <select className="form-select bg-light border-0" aria-label="Default select example">
//                     <option selected disabled>
//                         Rate
//                     </option>
//                     <option defaultValue="1">One</option>
//                     <option defaultValue="2">Two</option>
//                     <option defaultValue="3">Three</option>
//                 </select>
//             </div>
//             <div className="col-4 justify-content-end">
//                 <span className="badge bg-secondary border-radius w-100 fw-bold text-start text-white px-3 py-2">
//                     ₱
//                 </span>
//             </div>
//         </div>
//         <div className="row gx-3 px-3">
//             <div className="col text-center border-radius-lg d-flex">
//                 <div className="px-3 h-100 d-flex align-items-center bg-light">
//                     <RiUserSmileLine />
//                 </div>
//                 <select className="form-select bg-light border-0" aria-label="Default select example">
//                     <option selected disabled>
//                         Adult
//                     </option>
//                     <option defaultValue="1">One</option>
//                     <option defaultValue="2">Two</option>
//                     <option defaultValue="3">Three</option>
//                 </select>
//             </div>
//             <div className="col text-center border-radius-lg d-flex">
//                 <div className="px-3 h-100 d-flex align-items-center bg-light">
//                     <MdOutlineChildCare />
//                 </div>
//                 <select className="form-select bg-light border-0" aria-label="Default select example">
//                     <option selected disabled>
//                         Child
//                     </option>
//                     <option defaultValue="1">One</option>
//                     <option defaultValue="2">Two</option>
//                     <option defaultValue="3">Three</option>
//                 </select>
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-12">
//                 <button className="btn btn-white w-100 border-radius text-primary fw-bold p-2 mt-4">Show Add-ons</button>
//             </div>
//         </div>
//     </div>
// </div>
// </div >`
