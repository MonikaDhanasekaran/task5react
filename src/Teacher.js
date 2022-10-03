import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    Grid,
}
    from '@mui/material';

function Teacher() {

    let formValues = {
        name: '',
        age: '',
        experience: '',
        email: '',
        gender: '',
        major: '',
        error: {
            name: '',
            age: '',
            experience: '',
            email: '',
            gender: '',
            major: '',
        },
    };

    const [formData, setFormData] = useState(formValues);

    const [userData, setUserData] = useState([]);

    useEffect(() => {   

        async function getData() {

            const response = await axios.get("https://632050349f82827dcf29ba4b.mockapi.io/Users"); // fetch ku pathil axios 

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

    //To handle Edit button

    const onPopulateData = (id) => {  

        const selectedData = userData.filter((row) => row.id === id)[0];

        setFormData({

            ...formData,
            ...selectedData,

        });

    };

    //To handle Delete button

    const handleDelete = async (id) => {

        const response = await axios.delete(`https://632050349f82827dcf29ba4b.mockapi.io/Users/${id}`);

        const user = userData.filter((row) => row.id !== response.data.id);

        console.log(response);

        setUserData(user);

    }

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

            if (formData.id) {

                const response = await axios.put(`https://632050349f82827dcf29ba4b.mockapi.io/Users/${formData.id}`,

                    {
                        name: formData.name,
                        age: formData.age,
                        experience: formData.experience,
                        email: formData.email,
                        gender: formData.gender,
                        major: formData.major,
                    }

                );

                let users = [...userData];

                let index = users.findIndex((row) => row.id === response.data.id);

                users[index] = response.data;

                setUserData(users);

            } else {

                const response = await axios.post('https://632050349f82827dcf29ba4b.mockapi.io/Users',

                    {
                        name: formData.name,
                        age: formData.age,
                        experience: formData.experience,
                        email: formData.email,
                        gender: formData.gender,
                        major: formData.major,
                    }

                );

                setUserData([...userData, response.data]);

            }

            setFormData(formValues);

        }

    };

    return (

        <div style={{ padding: "10px" }}>

            <Grid container spacing={2}>

                <Grid item xs={4}>

                    <h2>Teacher's Registration Form</h2>

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
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={formData.name}
                            name="name"
                            onChange={(e) => handleChange(e)} />

                        <br />

                        <span style={{ color: 'red' }}>{formData.error.name}</span><br />

                        <TextField
                            id="age"
                            label="Age"
                            type="number"
                            variant="outlined"
                            value={formData.age}
                            name="age"
                            onChange={(e) => handleChange(e)} />

                        <br />

                        <span style={{ color: 'red' }}>{formData.error.age}</span><br />

                        <TextField
                            id="experience"
                            label="Experience"
                            type="number"
                            variant="outlined"
                            value={formData.experience}
                            name="experience"
                            onChange={(e) => handleChange(e)} />

                        <br />

                        <span style={{ color: 'red' }}>{formData.error.experience}</span><br />

                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={formData.email}
                            name="email"
                            onChange={(e) => handleChange(e)} />

                        <br />

                        <span style={{ color: 'red' }}>{formData.error.email}</span><br />

                        <FormControl>

                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="gender"
                                value={formData.gender}
                                onChange={(e) => handleChange(e)}
                            >

                                <FormControlLabel value="female" control={<Radio />} label="Female" />

                                <FormControlLabel value="male" control={<Radio />} label="Male" />

                                <FormControlLabel value="other" control={<Radio />} label="Other" />

                            </RadioGroup>

                        </FormControl> <br />

                        <FormControl fullWidth>

                            <InputLabel id="demo-simple-select-label">Major</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Major"
                                value={formData.major}
                                name="major"
                                onChange={(e) => handleChange(e)}
                            >

                                <MenuItem value="Tamil">Tamil</MenuItem>

                                <MenuItem value="English">English</MenuItem>

                                <MenuItem value="Mathematics">Mathematics</MenuItem>

                                {/* <MenuItem value="Science">Science</MenuItem>

                                <MenuItem value="Social">Social</MenuItem> */}

                            </Select>

                        </FormControl> <br />

                        <Button variant="contained" type="submit">Submit</Button>

                    </Box>

                </Grid>

                <Grid item xs={8}>

                    <h2 style={{ width: '40%', marginTop: '90px' }}>Teacher's Registered Data</h2>

                    <TableContainer component={Paper}>

                        <Table sx={{ width: 860 }} aria-label="simple table">

                            <TableHead>

                                <TableRow>

                                    <TableCell><b>Id</b></TableCell>

                                    <TableCell align="center"><b>Name</b></TableCell>
                                    <TableCell align="center"><b>Age</b></TableCell>
                                    <TableCell align="center"><b>Experience</b></TableCell>
                                    <TableCell align="center"><b>Email</b></TableCell>
                                    <TableCell align="center"><b>Gender</b></TableCell>
                                    <TableCell align="center"><b>Major</b></TableCell>
                                    <TableCell align="center"><b>Action</b></TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {userData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.age}</TableCell>
                                        <TableCell align="center">{row.experience}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.gender}</TableCell>
                                        <TableCell align="center">{row.major}</TableCell>
                                        <TableCell align="center">

                                            <Button variant="text" onClick={() => onPopulateData(row.id)}>

                                                Edit

                                            </Button>

                                            <br />

                                            <Button variant="text" onClick={() => handleDelete(row.id)}>Delete</Button>

                                    </TableCell>

                                </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

            </Grid>

        </div>

    );
}

export default Teacher;