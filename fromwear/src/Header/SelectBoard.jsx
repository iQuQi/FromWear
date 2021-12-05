import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handle_select_board}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    handle_select_board(event);
  };

  return (
    <Box sx={{ minWidth: "90px", height: "35px",marginRight: "10px" ,float:"right"}}>
      <FormControl variant ="standard" fullWidth>

        <Select style ={{height: "35px",fontSize:13,textAlign:"center",zIndex:100000}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          displayEmpty
          disabled={window.location.pathname!=("/search"||"/search#"||"/search/")}
          onChange={handleChange}
        >
          <MenuItem style={{fontSize:13 }} value="">게시판</MenuItem>
          <MenuItem style={{fontSize:13 }} value={10}>오늘의 착장</MenuItem>
          <MenuItem style={{fontSize:13 }} value={20}>도움이 필요해</MenuItem>
          <MenuItem style={{fontSize:13 }} value={30}>이번주 태그</MenuItem>
          <MenuItem style={{fontSize:13 }} value={40}>전체 게시판</MenuItem>


        </Select>
      </FormControl>
    </Box>
  );
}
