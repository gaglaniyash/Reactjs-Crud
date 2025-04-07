import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import {
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import {
  addStudent,
  updateStudent,
  deleteStudent,
  setSort,
  setSearchTerm,
  setCategory,
  filterByCategory,
} from "../redux/studentSlice";

export default function ReduxStudentCrud() {
  const dispatch = useDispatch();
  const { students, sort, searchTerm, category } = useSelector((state) => state.students);
  
  const [name, setName] = useState("");
  const [sub, setSub] = useState("");
  const [marks, setMarks] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [nameErr, setNameErr] = useState("");
  const [subErr, setSubErr] = useState("");
  const [marksErr, setMarksErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [attendanceErr, setAttendanceErr] = useState("");

  const phoneValidation = /^[0-9]{10}$/;

  const validateForm = () => {
    let isValid = true;
    if (name.trim() === "") {
      setNameErr("Please enter your name");
      isValid = false;
    } else {
      setNameErr("");
    }

    if (sub.trim() === "") {
      setSubErr("Please enter a subject.");
      isValid = false;
    } else {
      setSubErr("");
    }

    if (marks.trim() === "" || isNaN(marks)) {
      setMarksErr("Please enter a valid number");
      isValid = false;
    } else {
      setMarksErr("");
    }

    if (attendance.trim() === "" || isNaN(attendance)) {
      setAttendanceErr("Please enter valid attendance");
      isValid = false;
    } else {
      setAttendanceErr("");
    }

    if (!phoneValidation.test(phone)) {
      setPhoneErr("Phone number must have exactly 10 digits");
      isValid = false;
    } else {
      setPhoneErr("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const studentData = { id: editIndex || Date.now(), name, sub, marks, phone, attendance };
    
    if (editIndex == null) {
      dispatch(addStudent(studentData));
    } else {
      dispatch(updateStudent(studentData));
    }

    setName("");
    setSub("");
    setMarks("");
    setAttendance("");
    setPhone("");
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (id) => {
    const singleData = students.find((item) => item.id === id);
    setName(singleData.name);
    setSub(singleData.sub);
    setMarks(singleData.marks);
    setAttendance(singleData.attendance);
    setPhone(singleData.phone);
    setEditIndex(id);
  };

  const handleFilter = () => {
    dispatch(filterByCategory(category));
  };

  const searchedAndSortedData = students
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sort === "asc" ? a.marks - b.marks : b.marks - a.marks));

  return (
    <div style={{ fontFamily: '"poppins", sans-serif' }}>
      <h3>Student Crud with Redux</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Enter your name"
            variant="outlined"
            value={name}
            sx={{ width: "50%", fontFamily: '"poppins", sans-serif' }}
            onChange={(e) => setName(e.target.value)}
            error={!!nameErr}
            helperText={nameErr}
          />
          <TextField
            label="Enter your subject"
            variant="outlined"
            value={sub}
            sx={{ width: "50%", fontFamily: '"poppins", sans-serif' }}
            onChange={(e) => setSub(e.target.value)}
            error={!!subErr}
            helperText={subErr}
          />
          <TextField
            label="Enter your Marks"
            variant="outlined"
            value={marks}
            sx={{ width: "50%", fontFamily: '"poppins", sans-serif' }}
            onChange={(e) => setMarks(e.target.value)}
            error={!!marksErr}
            helperText={marksErr}
          />
          <TextField
            label="Attendance %"
            variant="outlined"
            value={attendance}
            sx={{ width: "50%", fontFamily: '"poppins", sans-serif' }}
            onChange={(e) => setAttendance(e.target.value)}
            error={!!attendanceErr}
            helperText={attendanceErr}
          />
          <TextField
            label="Enter your phone number"
            variant="outlined"
            value={phone}
            sx={{ width: "50%", fontFamily: '"poppins", sans-serif' }}
            onChange={(e) => setPhone(e.target.value)}
            error={!!phoneErr}
            helperText={phoneErr}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ alignSelf: "flex-start" }}
          >
            {editIndex == null ? "Add Data" : "Update"}
          </Button>
        </Box>
      </form>

      {/* Filtering */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <FormControl sx={{ width: "15%" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label=""
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"maths"}>Maths</MenuItem>
            <MenuItem value={"english"}>English</MenuItem>
            <MenuItem value={"science"}>Science</MenuItem>
          </Select>
        </FormControl>
        <Button
          color="warning"
          variant="contained"
          onClick={handleFilter}
          sx={{ marginLeft: "15px" }}
        >
          Filter
        </Button>

        {/* Searching */}
        <TextField
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          sx={{
            width: "15%",
            fontFamily: '"poppins", sans-serif',
            float: "right",
            marginRight: "5%",
          }}
        />

        {/* Sorting */}
        <FormControl sx={{ width: "15%", marginLeft: "20px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label=""
            onChange={(e) => dispatch(setSort(e.target.value))}
          >
            <MenuItem value={"asc"}>Asc</MenuItem>
            <MenuItem value={"desc"}>Desc</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Student data */}
      <TableContainer component={Paper}>
        <h3>Student Data</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedAndSortedData.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.sub}</TableCell>
                <TableCell>{e.marks}</TableCell>
                <TableCell>{e.attendance}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleEdit(e.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(e.id)}
                    sx={{ marginLeft: "5px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
} 