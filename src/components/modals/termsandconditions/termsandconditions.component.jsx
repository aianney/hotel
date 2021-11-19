import React from 'react'
import { Grid, Modal, Typography, Box } from '@material-ui/core'
import Theme from '../../theme/theme.component'
//import './termsandconditions.styles.css'

export default function TermsAndCondition() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Grid xs={12} sm={6}>
        <Typography
          style={{ color: '#71c7b8', cursor: 'pointer' }}
          onClick={handleOpen}
          variant="priceBreakdownTitle"
          sx={{ fontWeight: Theme.typography.bold }}
        >
          I agree to the Terms and Conditions
        </Typography>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            p={2}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: 550, xs: 320 },
              height: { md: 550, xs: 450 },
              lineHeight: { sx: 1.9 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              overflowY: 'auto',
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <button onClick={handleClose} className="button-agreed">
                X
              </button>
            </Grid>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TERMS AND CONDITIONS
            </Typography>
            <Grid item xs={12}>
              <Typography
                sx={{
                  lineHeight: { sx: 1.9 },
                }}
                id="modal-modal-description"
              >
                <ul>
                  <li> Room rates are quoted in Philippine Peso.</li>
                  <li>
                    Room rates are inclusive of service charges and taxes.
                  </li>
                  <li>Check-in time is 2:00 pm. Check-out is 12:00 noon.</li>
                  <li>
                    Payment for SBMA Environmental Fee (ETAF) of 100.00 net per
                    room per night on top of room rates and incidental deposit.
                  </li>
                  <li>
                    Guarantedd reservations are required. The full payment is
                    payable at booking time via Devit or Credit Card
                  </li>
                  <li>
                    The 72 hours free cancellation period is from the time of
                    arrival date.
                  </li>
                  <li>
                    After the 72-hour cancelation, a full charge will incur
                  </li>
                  <li>No refund for No Show and Shortened Stay</li>
                  <li>
                    Amendment to reservations is allowed 72 hours prior to
                    arrival. However, room rate difference may apply and is
                    subject to availability.
                  </li>
                  <li>Only children </li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  House Rules
                </Typography>
                <Grid item xs={12}>
                  <ul>
                    <li></li>
                  </ul>
                </Grid>
              </Typography>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <button onClick={handleClose} className="button-agreed">
                  Agreed
                </button>
              </Grid>
              <Grid
                item
                xs={12}
                mt={-3}
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <button onClick={handleClose} className="button-cancel">
                  Cancel
                </button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>
    </>
  )
}
