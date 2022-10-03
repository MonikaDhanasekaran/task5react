import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Grid,
  Button,
} from "@mui/material";

function Home() {

    let formValues = {
        email: '',
        password: '',
        error: {
          email: '',
          password: '',
        },
      };
    
      const [formData, setFormData] = useState(formValues);
    
      const [userData, setUserData] = useState([]);
    
      useEffect(() => {   
    
        async function getData() {
    
          const response = await axios.get("https://632050349f82827dcf29ba4b.mockapi.io/task"); 
    
          setUserData(response.data);
    
        }
    
        getData();
    
      }, []);      
    
      //To handle onChange event
    
      const handleChange = (e) => {
    
        let error = { ...formData.error };
    
        if (e.target.value === '') {
    
          error[e.target.name] = `${e.target.name} is Required`;
    
        } else {
    
          error[e.target.name] = '';
    
        }
    
        setFormData({ ...formData, [e.target.name]: e.target.value, error });
    
      };
    
      // To handle submit button
    
      const handleSubmit = async (e) => {
    
        e.preventDefault();
    
        const errKeys = Object.keys(formData).filter((key) => {
    
          if (formData[key] === "" && key !== "error" && key !== "id") {
    
            return key;
    
          }
    
        });
    
        if (errKeys.length >= 1) {
    
          alert("Please Fill All Values");
    
        } else {
    
           let users = [...userData];
    
            setUserData(users);
    
          } 
          setFormData(formValues);
    
        }
    
    
  
  return (
    
    <div style={{ padding: "50px", color: 'black', textAlign: 'center' }}>

      <h1 style={{ width: '100%', textAlign: 'center' }}>Login</h1>
        
      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>

          <Grid item xs={12}>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e)}
            >

              <TextField
                id="email"
                label="Email"
                variant="filled"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)} />

              <br />

              <span style={{ color: 'red' }}>{formData.error.email}</span><br />

              <TextField
                id="password"
                type="password"
                label="Password"
                variant="filled"
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)} />

              <br />

              <span style={{ color: 'red' }}>{formData.error.password}</span><br />

              <Button variant="contained" type="submit">Submit</Button>

            </Box>

          </Grid>

          </Grid>

      </Box>
   
    </div>

    );
}

export default Home;