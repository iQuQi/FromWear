import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MyPostBoard from './MyPostBoard';
import { grey } from '@mui/material/colors';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{padding:'0px'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyPageTab({user}) {
  const [value, setValue] = React.useState(0);
  let now_user = user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  console.log("num");

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', margin:'auto', width: '380px', color:'black'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >
          <Tab label="게시물" {...a11yProps(0)} />
          <Tab label="SOS" {...a11yProps(1)} />
          <Tab label="댓글" {...a11yProps(2)} />
          <Tab label="북마크" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
			    <MyPostBoard user={now_user}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
        <MyPostBoard user={now_user}/>	
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}
