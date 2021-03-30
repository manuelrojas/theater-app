import React from 'react';
import Rating from '@material-ui/lab/Rating';

import Box from '@material-ui/core/Box';

export default function MovieRating ({ value, onChange }) {
    
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => onChange(newValue) }
          />
        </Box>
      </div>
    );
  }