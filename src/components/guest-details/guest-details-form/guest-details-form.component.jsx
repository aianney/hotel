import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router'
import RegionCountry from '../region-country/region-country.component'
import BirthdatePicker from '../birthdate/birthdate.component'
import Theme from '../../theme/theme.component'
import Nationality from '../../guest-details/nationality/nationality.component'
import './guest-details-form.styles.css'
import CustomButton from '../../custom-button/custom-button.component'
import AppContext from '../../app-context/app-context.component'

function GuestDetailsForm(props) {
  const [error, setError] = React.useState('')
  const [error1, setError1] = React.useState('')
  const { info, setInfo } = React.useContext(AppContext)
  const history = useHistory()
  const [userCredentials, setUserCredentials] = React.useState({
    firstName: '',
    lastName: '',
    nationality: '',
    number: '',
    email: '',
    homeaddress: '',
    message: '',
  })

  React.useEffect(() => {
    setInfo({
      ...info,
      guestDetails: {
        ...userCredentials,
      },
    })
    // eslint-disable-next-line
  }, [userCredentials])

  const handleFirstNameInputChange = ({ target }) => {
    if (
      // eslint-disable-next-line
      !userCredentials.firstName.match(
        // eslint-disable-next-line
        /[!@#$%^&*()_+\-=\s\[\]{};':"\\|,.<>\/?0-9]/,
      )
    ) {
      setError('')
    } else {
      setError('Invalid Name %<>$\'"')
    }
    setUserCredentials({
      ...userCredentials,
      firstName: target.value.toUpperCase(),
    })
  }

  const handleLastNameInputChange = ({ target }) => {
    if (
      // eslint-disable-next-line
      !userCredentials.lastName.match(
        // eslint-disable-next-line
        /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?0-9]/,
      )
    ) {
      setError1('')
    } else {
      setError1('Invalid Last Name %<>$\'"')
    }
    setUserCredentials({
      ...userCredentials,
      lastName: target.value.toUpperCase(),
    })
  }

  const handleLNumberInputChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      number: event.target.value.toUpperCase(),
    })
  }

  // const handleLNationalityChange = (event) => {
  //   setUserCredentials({ ...userCredentials, nationality: event.target.value })
  // }
  const handleEmailInputChange = (event) => {
    setUserCredentials({ ...userCredentials, email: event.target.value })
  }
  const handleHomeAddressInputChange = (event) => {
    setUserCredentials({ ...userCredentials, homeAddress: event.target.value })
  }
  const handleLMessageInputChange = (event) => {
    setUserCredentials({ ...userCredentials, message: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      userCredentials.firstName &&
      userCredentials.lastName &&
      userCredentials.nationality &&
      userCredentials.number &&
      userCredentials.email
    ) {
      history.push(`/payments`, { userCredentials })
      console.log(userCredentials)
    } else {
      console.log('invalid', userCredentials)
    }
  }

  return (
    <div className="guest-details">
      {/* <Typography gutterBottom variant="h3" align="center"></Typography> */}
      <Typography variant="pageTitle">Guest Details</Typography>
      <Typography
        variant="pageSubtitle"
        color="textSecondary"
        component="p"
        gutterBottom
      >
        Fill in the following details to proceed to payment
      </Typography>

      <Box mb={10}>
        <Card
          style={{
            paddingLeft: '25',
            backgroundColor: Theme.palette.light,
            fontFamily: Theme.typography.body1,
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={4} item>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="first name"
                    name="first name"
                    helperText={error}
                    error={!!error}
                    value={userCredentials.firstName}
                    onChange={handleFirstNameInputChange}
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="last name"
                    name="last name"
                    helperText={error1}
                    error={!!error1}
                    value={userCredentials.lastName}
                    onChange={handleLastNameInputChange}
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Nationality />
                  {/* <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="text"
                    name="nationality"
                    value={userCredentials.nationality}
                    onChange={handleLNationalityChange}
                    placeholder="Enter Nationality"
                    label="Nationality"
                    variant="outlined"
                    fullWidth
                    required
                  /> */}
                </Grid>
                <Grid xs={12} sm={5} item>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    name="number"
                    value={userCredentials.number}
                    onChange={handleLNumberInputChange}
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="email"
                    name="email"
                    value={userCredentials.email}
                    onChange={handleEmailInputChange}
                    placeholder="Email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <BirthdatePicker />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="text"
                    name="house no."
                    value={userCredentials.homeAddress}
                    onChange={handleHomeAddressInputChange}
                    placeholder="House No"
                    label="House No/Street/Subd."
                    variant="outlined"
                    fullWidth
                    //required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <RegionCountry />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ borderRadius: Theme.shape.borderRadiusSm }}
                    type="text"
                    name="message"
                    value={userCredentials.message}
                    onChange={handleLMessageInputChange}
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Type your message here"
                    variant="outlined"
                    fullWidth
                    //required
                  />
                </Grid>
              </Grid>
              <CustomButton
                type="submit"
                disabled={info.guestDetails.email ? false : true}
              >
                Proceed
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default GuestDetailsForm
