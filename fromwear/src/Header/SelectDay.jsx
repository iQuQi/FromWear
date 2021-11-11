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
    <Box style={{ minWidth: "90px", height: "45px" ,marginRight: "10px", float:"right"}}>
      <FormControl variant ="standard" fullWidth>

        <Select
          style ={{height: "45px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value="">기간</MenuItem>
          <MenuItem value={10}>오늘</MenuItem>
          <MenuItem value={20}>일주일</MenuItem>
          <MenuItem value={30}>한달</MenuItem>
          <MenuItem value={40}>6개월</MenuItem>
          <MenuItem value={50}>1년</MenuItem>


        </Select>
      </FormControl>
    </Box>
  );
}
