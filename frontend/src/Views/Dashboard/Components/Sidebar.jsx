import styled from "@emotion/styled";
import {
  AccountBox,
  Article,
  Group,
  Explore,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  PersonAdd,
  Mail,
  Bloodtype,
  Report,
  Inbox,
  Dashboard,
  HistoryRounded,
  SearchOutlined
  
} from "@mui/icons-material";

import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';

import {
  Box,
  List,
  Stack,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTab from './TabComponent'; 
import SubTab from './SubTabs';
import ImageUploader from "../ImageUpload";
import HistorySearchedCardList from "../SearchHistory";



{/*implementation */}

{/*properties of elements */}
const ListButtonProp =(props)=>{

 return {
  
  '&.Mui-selected':{borderLeft:'solid 5px '+props.bordeColor,backgroundColor:props.backColor,color:'white'},
  '&.Mui-selected:hover':{backgroundColor:props.bordeColor},
  '&:hover':{
    backgroundColor:props.backHoverColor,
    color:'white'
  },
  borderRadius:'0px 5px 5px 0px'
  

}

}

const IconProp = (prop)=>{

  return{
    '&':{
      color:prop.bordeColor
    }
    ,
    '&:hover':{
      color:"white"
    }
  }
}

const ListText = styled(ListItemText)(({theme})=>({


}));



{/*sidebar options */}
function renderComponent(current,props,array){

  switch(current){
    case array[0]:
      return <CustomTab title="Detect Disease" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<ImageUploader/>}/>
    case array[1]:
      return <CustomTab title="Search History" titleBackColor={props.backColor} fontSize="h5" fontColor="white" renderContent={<HistorySearchedCardList />}/>   
  }

}


const state = ['Detect Disease','Search History'];


{/*sidebar */}
const Sidebar = (props) => {

  const[selectedItem, setSelectedItem] = useState('Detect Disease');

  return (
    
    
      <Grid container spacing={2} sx={{height:'93vh'}}>
        <Grid item xs={2} md={3} lg={2}>
      <Box position="fixed" sx={{width:'100%', display: 'flex',flexDirection:'row',justifyContent: {sm:'center',lg:'flex-start',md:'flex-start'},marginTop:'-00px'}} >

        {/*Disease tab */}
        <List id="List" sx={{overflowX:'scroll',display:'flex',flexDirection:{
          sm:'row', lg:'column',md:'column'
        } ,scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none' // Chrome, Safari, Edge, and Opera
        }}}>
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[0]} onClick={()=>{setSelectedItem(state[0])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <SearchOutlined sx={IconProp(props)}/>
              </ListItemIcon>
              <ListText sx={{display:{xs:'none',md:'block'}}} primary={state[0]} />
            </ListItemButton>
          </ListItem>

        {/*Search History*/}
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem===state[1]} onClick={()=>{setSelectedItem(state[1])}} sx={ListButtonProp(props)}>
              <ListItemIcon>
                <HistoryRounded sx={IconProp(props)} />
              </ListItemIcon>
              <ListText  sx={{display:{xs:'none',md:'block'}}} primary={state[1]}/>
            </ListItemButton >
          </ListItem>

      
        </List>
        </Box>
        </Grid>
        <Grid item xs={10} md={9} lg={10}>

          {/*content */}
      <Box  sx={{marginLeft:{
        xs:-3.5,
        lg:-4,
    
        
      },
      marginTop:{

        xs:3.5,
        lg:4,

      },
      width:'100%', display:'flex', justifyContent:'center',alignItems:'flex-start',height:'100%',overflow:'scroll'}}>
       {renderComponent(selectedItem,props,state)}
     </Box>
     </Grid>
    
  </Grid>
    
   
  );
};

export default Sidebar;
