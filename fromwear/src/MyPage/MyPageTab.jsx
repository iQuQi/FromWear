
import MyPostBoard from './MyPostBoard';


import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
class MyPageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      now_user: props.user,
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({
        now_user: this.props.user,
        })
    }
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  }
  render() {
    console.log("지금 유저", this.state.now_user);
    return (
      <Box sx={{ width: '100%' }} style={{padding:'0px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', margin:'auto', width: '380px', color:'black'}}>
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
            <Tab label="게시물" {...this.a11yProps(0)} />
            <Tab label="SOS" {...this.a11yProps(1)} />
            <Tab label="댓글" {...this.a11yProps(2)} />
            <Tab label="북마크" {...this.a11yProps(3)} />
          </Tabs>
        </Box>
        
        <TabPanel value={this.state.value} index={0}>
          <MyPostBoard user={this.state.now_user} board={20}/>
          {console.log(this.state.now_user)}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <MyPostBoard user={this.state.now_user} board={1}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    );
  }
  }
class TabPanel extends Component {
  render() {
    return (
      <Typography component="div" hidden={this.props.value !== this.props.index}>
        <Box p={3}>{this.props.children}</Box>
      </Typography>
    );
  }
}
export default MyPageTab;