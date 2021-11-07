import React from 'react'
import Theme from '../theme/theme.component'
import { Box, Button } from '@material-ui/core'

const CustomButton = ({ children, ...props }) => {
  return (
    <>
      <Box px={4}>
        <Button
          {...props}
          variant="contained"
          sx={{
            borderRadius: Theme.shape.borderRadius,
          }}
        >
          <Box
            px={2}
            py={1}
            sx={{
              fontWeight: Theme.typography.fontWeightBold,
              textDecoration: 'none',
              color: 'unset',
            }}
          >
            {' '}
            {children}
          </Box>
        </Button>
      </Box>
    </>
  )
}

export default CustomButton
