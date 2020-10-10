import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/plantrips">
      <ListItemIcon>
        <CardTravelIcon />
      </ListItemIcon>
      <ListItemText primary="Trip Routes" />
    </ListItem>
    <ListItem button component="a" href="/flights">
      <ListItemIcon>
        <AirplanemodeActiveIcon />
      </ListItemIcon>
      <ListItemText primary="Flights" />
    </ListItem>
    <ListItem button component="a" href="/foodfootprint">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Food" />
    </ListItem>
    <ListItem>
      
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    
    <ListItem button>
      <ListItemIcon>
        <LiveHelpIcon />
      </ListItemIcon>
      <ListItemText primary="FAQ" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <VideoLabelIcon />
      </ListItemIcon>
      <ListItemText primary="Demo" />
    </ListItem>
    <ListItem button>
    </ListItem>
  </div>
);