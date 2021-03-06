import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handle_select_day}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    handle_select_day(event);
  };

  return (
    <Box style={{ minWidth: "90px", height: "35px" ,marginRight: "10px", float:"right"}}>
      <FormControl variant ="standard" fullWidth>

        <Select
          style ={{height: "35px", fontSize:13,textAlign:"center"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem  style={{fontSize:13 }} value="">기간</MenuItem>
          <MenuItem style={{fontSize:13 }} value={10}>오늘</MenuItem>
          <MenuItem style={{fontSize:13 }} value={20}>일주일</MenuItem>
          <MenuItem style={{fontSize:13 }} value={30}>한달</MenuItem>
          <MenuItem style={{fontSize:13 }} value={40}>6개월</MenuItem>
          <MenuItem style={{fontSize:13 }} value={50}>1년</MenuItem>
          <MenuItem style={{fontSize:13 }} value={60}>전체</MenuItem>



        </Select>
      </FormControl>
    </Box>
  );
}