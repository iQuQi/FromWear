import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "90px", height: "35px",marginRight: "10px" ,float:"right"}}>
      <FormControl variant ="standard" fullWidth>

        <Select
<<<<<<< HEAD
          style ={{height: "35px",fontSize:13,header:"center"}}
=======
          style ={{height: "35px",fontSize:13,textAlign:"center"}}
>>>>>>> main_page
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem style={{fontSize:13 }} value="">성별</MenuItem>
          <MenuItem style={{fontSize:13 }} value={10}>여자</MenuItem>
          <MenuItem style={{fontSize:13 }} value={20}>남자</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
