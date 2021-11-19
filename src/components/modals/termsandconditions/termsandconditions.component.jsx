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
              Terms and Condition
            </Typography>
            <Grid item xs={12}>
              <Typography
                sx={{
                  lineHeight: { sx: 1.9 },
                }}
                id="modal-modal-description"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                {/* eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. */}
                <Grid item xs={12}>
                  <ul>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                  </ul>
                  {/* Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. */}
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                  </ul>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      {' '}
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </li>
                  </ul>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia.
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
