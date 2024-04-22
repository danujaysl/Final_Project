import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


const HistoryCard = ({ historyItem }) => {


  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant="h6" component="div" >
          Disease Class: {historyItem.disease_class}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Confidence: {historyItem.confidence}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Image Path: {historyItem.img_path}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Time: {historyItem.time}
        </Typography>
      </CardContent>
    </Card>
  );
};

const HistorySearchedCardList = () => {

    const[history,setHistory] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{

        const token = JSON.parse(localStorage.getItem('user'))?.token

        const headers = {
            Authorization: `Bearer ${token}`
        };

        Axios.get('/get-all-search',{headers}).then(res=>{
            console.log(res.data)
            setHistory(res.data.history)
        }).catch(err=>{
            navigate("/expire")
        })

    },[])

  return (
    <Card sx={{backgroundColor:'white'}}>
    <Grid container spacing={2}>
      {history.map((historyItem) => (
        <Grid item xs={12} md={12} key={historyItem._id}>
          <HistoryCard historyItem={historyItem} />
        </Grid>
      ))}
    </Grid>
    </Card>
  );
};

export default HistorySearchedCardList;
