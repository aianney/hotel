import { useState, useEffect } from 'react'
import axios from 'axios'
import { Theme } from '../../components'
import { Box, Chip, Grid, Skeleton } from '@material-ui/core'

const RoomAmenities = (props) => {
  const [amenities, setAmenities] = useState([]),
    id = props.match.params.id,
    getRoomAmenities = () => {
      axios
        .get(
          `https://hotelreservations.ph/gpDBProcess/process.php?request=getRateAmenities&rateID=${id}`,
        )
        .then((r) => {
          r.data.state === 'Success'
            ? setAmenities(r.data.data[0])
            : console.log(r)
        })
        .catch((e) => console.log(e))
    }

  useEffect(() => {
    getRoomAmenities()
    console.log(amenities)
  })

  return (
    <>
      <Box mb={4}>
        {amenities.RateImages && amenities.RateImages[0] ? (
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              px={3}
              sx={{
                display: {
                  xs: 'iflex',
                  md: '',
                },
                overflowX: {
                  xs: 'scroll',
                  md: 'auto',
                },
                flexWrap: {
                  xs: 'nowrap',
                  md: 'wrap',
                },
              }}
            >
              {amenities.RateInclusions.reverse().map((data, index) => (
                <Box mx={1}>
                  <Chip
                    label={data}
                    sx={{
                      backgroundColor: Theme.palette.secondary.main,
                      color: 'white',
                      fontWeight: Theme.typography.fontWeightBold,
                      borderRadius: Theme.shape.borderRadiusSm,
                    }}
                  />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                px={3}
                spacing={2}
                sx={{
                  display: {
                    xs: 'iflex',
                    md: '',
                  },
                  overflowX: {
                    xs: 'scroll',
                    md: 'auto',
                  },
                  flexWrap: {
                    xs: 'nowrap',
                    md: 'wrap',
                  },
                }}
              >
                {amenities.RateImages.map((img, index) => (
                  <Grid
                    item
                    xs={amenities.RateImages.length > 1 ? 11 : 12}
                    md={6}
                  >
                    <Box
                      component="img"
                      src={`data:image/png;base64,${img}`}
                      sx={{
                        width: '100%',
                        height: {
                          xs: '250px',
                          sm: null,
                        },
                        borderRadius: Theme.shape.borderRadius,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Skeleton
            sx={{ borderRadius: Theme.shape.borderRadius, width: '100%' }}
            variant="rectangular"
            height={350}
          />
        )}
      </Box>
    </>
  )
}

export default RoomAmenities
