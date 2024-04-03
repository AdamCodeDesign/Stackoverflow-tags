import { Box } from '@mui/system'
import PropTypes from 'prop-types'

export default function TotalTags({total, backgroundColor, fontSize}) {
  return (
    <Box style={{fontSize, backgroundColor}}> Total tags : {total}</Box>
  )
}

TotalTags.propTypes = {
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string
}