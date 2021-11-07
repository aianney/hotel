import React from 'react'
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router'
import ReCAPTCHA from 'react-google-recaptcha'
import RegionCountry from '../region-country/region-country.component'
import BirthdatePicker from '../birthdate/birthdate.component'
import Theme from '../../theme/theme.component'
import './guest-details-form.styles.css'
import CustomButton from '../../custom-button/custom-button.component'

function GuestDetailsForm() {
  // handleChange = (value) => {
  //     console.log("Captcha value:", value);
  //   }
  const history = useHistory()
  const [userCredentials, setUserCredentials] = React.useState({
    firstName: '',
    lastName: '',
    nationality: '',
    number: '',
    email: '',
    housenumber: '',
    street: '',
    barangay: '',
    cityOfResidence: '',
    province: '',
    message: '',
  })
  const [submitted, setSubmitted] = React.useState(false)
  const [valid, setIsValid] = React.useState(false)

  const handlePressPayment = () => {
    history.push(`/payments`)
  }

  const handleFirstNameInputChange = (event) => {
    setUserCredentials({ ...userCredentials, firstName: event.target.value })
  }
  const handleLastNameInputChange = (event) => {
    setUserCredentials({ ...userCredentials, lastName: event.target.value })
  }
  const handleLNationalityInputChange = (event) => {
    setUserCredentials({ ...userCredentials, nationality: event.target.value })
  }
  const handleLNumberInputChange = (event) => {
    setUserCredentials({ ...userCredentials, number: event.target.value })
  }
  const handleEmailInputChange = (event) => {
    setUserCredentials({ ...userCredentials, email: event.target.value })
  }
  const handleHouseNumberInputChange = (event) => {
    setUserCredentials({ ...userCredentials, housenumber: event.target.value })
  }
  const handleStreetInputChange = (event) => {
    setUserCredentials({ ...userCredentials, street: event.target.value })
  }
  const handleBarangayInputChange = (event) => {
    setUserCredentials({ ...userCredentials, barangay: event.target.value })
  }
  const handleCityOfResidenceInputChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      cityOfResidence: event.target.value,
    })
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
      userCredentials.country &&
      userCredentials.email &&
      userCredentials.cityOfResidence &&
      userCredentials.date &&
      userCredentials.message
    ) {
      setIsValid(true)
    }
    setSubmitted(true)
  }

  return (
    <div className="guest-details">
      {/* <Typography gutterBottom variant="h3" align="center"></Typography> */}
      <Card
        style={{
          width: 'calc(100% + 5px)',
          paddingLeft: '25',
          backgroundColor: Theme.palette.light,
          fontFamily: Theme.typography.body1,
        }}
      >
        <CardContent>
          <Typography variant="pageTitle">Guest Details</Typography>
          <Typography
            variant="pageSubtitle"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Fill in the following details to proceed to payment
          </Typography>
          <form onSubmit={handleSubmit}>
            {submitted && valid ? (
              <div className="success-message">
                Success! Thank you for registering
              </div>
            ) : null}
            <Grid container spacing={3}>
              <Grid xs={12} sm={4} item>
                <TextField
                  sx={{ borderRadius: Theme.shape.borderRadiusLg }}
                  type="first name"
                  name="first name"
                  value={userCredentials.firstName}
                  onChange={handleFirstNameInputChange}
                  placeholder="Enter first name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.firstName ? (
                  <span>Please enter a first name</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={4} item>
                <TextField
                  type="last name"
                  name="last name"
                  value={userCredentials.lastName}
                  onChange={handleLastNameInputChange}
                  placeholder="Enter last name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.lastName ? (
                  <span>Please enter a last name</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={4} item>
                <TextField
                  name="nationality"
                  value={userCredentials.nationality}
                  onChange={handleLNationalityInputChange}
                  placeholder="Enter Nationality"
                  label="Nationality"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.nationality ? (
                  <span>Please enter your nationality</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={5} item>
                <TextField
                  name="number"
                  value={userCredentials.number}
                  onChange={handleLNumberInputChange}
                  placeholder="Enter phone number"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.number ? (
                  <span>Please enter your number</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={4} item>
                <TextField
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
                {submitted && !userCredentials.email ? (
                  <span>Please enter a email</span>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={3}>
                <BirthdatePicker />
              </Grid>
              <Grid xs={12} sm={2} item>
                <TextField
                  type="number"
                  name="house no."
                  value={userCredentials.housenumber}
                  onChange={handleHouseNumberInputChange}
                  placeholder="House No"
                  label="House No"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.housenumber ? (
                  <span>Please enter a house number</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={5} item>
                <TextField
                  type="text"
                  name="street"
                  value={userCredentials.street}
                  onChange={handleStreetInputChange}
                  placeholder="Street"
                  label="Street"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.street ? (
                  <span>Please enter a street</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={5} item>
                <TextField
                  type="text"
                  name="barangay"
                  value={userCredentials.barangay}
                  onChange={handleBarangayInputChange}
                  placeholder="Barangay"
                  label="Barangay"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.barangay ? (
                  <span>Please enter your barangay</span>
                ) : null}
              </Grid>
              <Grid xs={12} sm={5} item>
                <TextField
                  type="text"
                  name="city of residence"
                  value={userCredentials.cityOfResidence}
                  onChange={handleCityOfResidenceInputChange}
                  placeholder="City of Residence"
                  label="City of Residence"
                  variant="outlined"
                  fullWidth
                  required
                />
                {submitted && !userCredentials.cityOfResidence ? (
                  <span>Please enter a residence</span>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <RegionCountry />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
                  required
                />
                {submitted && !userCredentials.message ? (
                  <span>Please enter a message</span>
                ) : null}
              </Grid>
              <ReCAPTCHA className="recapcha" sitekey="Your client site key" />
              <Grid item xs={12}>
                <CustomButton
                  className="button_guest__details "
                  type="submit"
                  onClick={handlePressPayment}
                >
                  Proceed
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default GuestDetailsForm
