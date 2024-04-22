import React, { useState } from 'react';
import fileaxios from '../../api/fileaxios';
import { FormControl, FormLabel,Button, Typography,Card, CardContent, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import { useNavigate } from 'react-router-dom';


const btnprop = {
    width: "20%",
    height: "50px",
    backgroundColor: "#12372A",
    borderRadius: "10px",
    marginBottom: "10px",
    color: "white",
    "&:hover": {
      border: "1px solid grey",
      color: "white",
      backgroundColor: "black",
      fontWeight: "bolder",
    },
  };

const DetailComponent = ({ prevention,treatments,additional,general }) => {


    return (
      <Box>
    
          <Typography variant="h5" color="textSecondary" sx={{marginTop:'15px',marginBottom:'10px'}}>
            Prevention
          </Typography>
          {prevention.map((line) => (
            <Typography variant='body1'>{line}</Typography>
        ))}
          <Typography variant="h5" color="textSecondary" sx={{marginTop:'15px',marginBottom:'10px'}}>
           Treatments
          </Typography>
          {treatments.map((line) => (
            <Typography variant='body1'>{line}</Typography>
        ))}
          <Typography variant="h5" color="textSecondary" sx={{marginTop:'15px',marginBottom:'10px'}}>
            Genereal Tips
          </Typography>
          {general.map((line) => (
            <Typography variant='body1'>{line}</Typography>
        ))}
          <Typography variant="h5" color="textSecondary" sx={{marginTop:'15px',marginBottom:'10px'}}>
            Additional Considerations
          </Typography>
          {additional.map((line) => (
            <Typography variant='body1'>{line}</Typography>
        ))}
        
      </Box>
    );
  };

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: null, height: null });
  const navigate = useNavigate();

  const [data,setData] = useState({
    pred_class:"",
    level:0.0,
   
  })

  const [disease_data,setDiseaseData] = useState({
    disease:"no",
    prevention:[],
    treatment:[],
    general:[],
    additional_considerations:[]
})

  const theme = useTheme();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if(!file){
        setSelectedFile(null)
        setPreviewURL('')
        setData({
            pred_class:"",
            level:0.0
          })
        return
    }

    // Basic validation for file type and size (optional)
    if (!file.type.match('image.*')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 1024 * 1024 * 5) { // 5MB limit (adjust as needed)
      alert('Image size exceeds the maximum limit of 5MB.');
      return;
    }

    setSelectedFile(file);
    setData({
        pred_class:"",
        level:0.0
      })

    const reader = new FileReader();
    reader.onload = (e) =>{
        setPreviewURL(e.target.result);
        const image = new Image();
        image.onload = () => {
            console.log(image.width)
            setImageDimensions({ width: image.width, height: image.height });
        };
    }
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile); 

      
      const token = JSON.parse(localStorage.getItem('user'))?.token

      const headers = {
        Authorization: `Bearer ${token}`
      };

      const response = await fileaxios.post('/upload',formData,{headers})

      if(response.status===401){
        navigate("/expire")
      }

      if (response.status === 201) {
        const data = response.data;
        console.log('Success:', data.disease);
        setDiseaseData(data.disease)
        setData(data.data); 
      } else {
        console.error('Upload failed:', response.statusText);
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card >
    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
    <Typography variant='h4'>Upload Image</Typography>
      <br />
      <Box
      sx={{
        position: 'relative',
        border: `3px dashed ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        height:previewURL?'auto':'100px',
        width: previewURL?imageDimensions.width+'px':'100%', // Adjust width as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
       
      {previewURL ? (
        <img src={previewURL} alt="Image Preview"/>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No Image Added
        </Typography>
      )}
    </Box>
    <FormControl fullWidth variant="standard" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column'}}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" >
            {previewURL?'Change Image':'Choose Image'}
          
          </Button>
        </label>
      </FormControl>
      {previewURL && (
        <>
        <Typography variant="body2" sx={{marginTop:'20px'}}>File Name : {selectedFile.name}</Typography>
        </>

      )}

      <br />
      <Button type="submit" variant="contained" disabled={isLoading} sx={btnprop} onClick={handleSubmit}>
        Upload {isLoading ? '...' : ''}
      </Button>
      {data.pred_class!==""?(
        <>
         <Typography variant="body2">Predicted Class: {data.pred_class}</Typography>
         <Typography variant="body2">Confidence Level: {data.level}</Typography>
         
         <br />
         <DetailComponent prevention={disease_data.prevention} treatments={disease_data.treatment} general={disease_data.general}
         additional={disease_data.additional_considerations} />
         </>    
      ):(<></>)}
     
      <br />
    
    </CardContent>
  </Card>
  );
};

export default ImageUploader;
