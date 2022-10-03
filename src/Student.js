import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    InputLabel,
    FormControl,
    MenuItem,
    Button,
    Radio,
    Select,
    Grid,
    Table,
    TableBody,
    TableCell,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function Student() {

    let formValues = {
        name: '',
        age: '',
        email: '',
        gender: '',
        courses: '',
        error: {
            name: '',
            age: '',
            email: '',
            gender: '',
            courses: '',
        },
    };

    const [formData, setFormData] = useState(formValues);

    const [userData, setUserData] = useState([]);

    useEffect(() => {   

        async function getData() {

            const response = await axios.get("https://632050349f82827dcf29ba4b.mockapi.io/user"); 

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

        const response = await axios.delete(`https://632050349f82827dcf29ba4b.mockapi.io/user/${id}`);

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

                const response = await axios.put(`https://632050349f82827dcf29ba4b.mockapi.io/user/${formData.id}`,

                    {
                        name: formData.name,
                        age: formData.age,
                        email: formData.email,
                        gender: formData.gender,
                        courses: formData.courses,
                    }

                );

                let users = [...userData];

                let index = users.findIndex((row) => row.id === response.data.id);

                users[index] = response.data;

                setUserData(users);

            } else {

                const response = await axios.post('https://632050349f82827dcf29ba4b.mockapi.io/user',

                    {
                        name: formData.name,
                        age: formData.age,
                        email: formData.email,
                        gender: formData.gender,
                        courses: formData.courses,
                    }

                );

                setUserData([...userData, response.data]);

            }

            setFormData(formValues);

        }

    };

    return (

        <div style={{ padding: "10px", color: 'black' }}>

            <h2>Student's Registration Form</h2>

            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={2}>

                    <Grid item xs={4}>

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
                                type="number"
                                label="Age"
                                variant="outlined"
                                value={formData.age}
                                name="age"
                                onChange={(e) => handleChange(e)} />

                            <br />

                            <span style={{ color: 'red' }}>{formData.error.age}</span><br />

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

                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />

                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />

                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />

                                </RadioGroup>

                            </FormControl> <br />

                            <FormControl>

                                <InputLabel id="demo-simple-select-label">Courses</InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    style={{ width: '100%'}}
                                    id="demo-simple-select"
                                    label="Courses"
                                    value={formData.courses}
                                    name="courses"
                                    onChange={(e) => handleChange(e)}
                                >

                                    <MenuItem value="Bio-Maths">Bio-Maths</MenuItem>

                                    <MenuItem value="Computer-Maths">Computer-Maths</MenuItem>

                                    <MenuItem value="Bio-Computer">Bio-Computer</MenuItem>

                                </Select>

                            </FormControl> <br /> <br /> 


                            <Button variant="contained" type="submit">Submit</Button>

                        </Box>

                    </Grid>

                    <Grid item xs={8}>

                        <h2 style={{ width: '40%', marginTop: '20px' }}>Student's Registered Data</h2>

                        <TableContainer component={Paper}>

                            <Table sx={{ width: 860 }} aria-label="simple table">

                                <TableHead>

                                    <TableRow>

                                        <TableCell><b>Id</b></TableCell>

                                        <TableCell align="center"><b>Name</b></TableCell>

                                        <TableCell align="center"><b>Age</b></TableCell>

                                        <TableCell align="center"><b>Email</b></TableCell>

                                        <TableCell align="center"><b>Gender</b></TableCell>

                                        <TableCell align="center"><b>Courses</b></TableCell>

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

                                            <TableCell align="center">{row.email}</TableCell>

                                            <TableCell align="center">{row.gender}</TableCell>

                                            <TableCell align="center">{row.courses}</TableCell>

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

            </Box>

        </div>

    );
}

export default Student;
