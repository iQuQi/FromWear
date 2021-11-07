import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "90px", height: "45px",marginRight: "10px" }}>
      <FormControl fullWidth>

        <Select
          style ={{height: "40px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value="">성별</MenuItem>
          <MenuItem value={10}>여자</MenuItem>
          <MenuItem value={20}>남자</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
