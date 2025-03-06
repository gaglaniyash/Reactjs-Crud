import React, { use, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  FormControl,
  MenuItem,
  InputLabel,
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

export default function LocalStorageCrud() {
  const [sort, setSort] = useState("asc");
  const [term, setTerm] = useState("");
  const [cat, setCat] = useState("");
  const [name, setName] = useState("");
  const [sub, setSub] = useState("");
  const [marks, setMarks] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [nameErr, setNameErr] = useState("");
  const [subErr, setSubErr] = useState("");
  const [marksErr, setMarksErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [attendanceErr, setAttendanceErr] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let allData = JSON.parse(localStorage.getItem("students")) || [];
    setRecord(allData);
  };

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

    if (editIndex == null) {
      let obj = { id: Date.now(), name, sub, marks, phone, attendance };
      setRecord([...record, obj]);
      localStorage.setItem("students", JSON.stringify([...record, obj]));
    } else {
      let singleData = record.find((item) => item.id == editIndex);
      singleData.name = name;
      singleData.sub = sub;
      singleData.marks = marks;
      singleData.phone = phone;
      singleData.attendance = attendance;
      localStorage.setItem("students", JSON.stringify(record));
    }
    setName("");
    setSub("");
    setMarks("");
    setAttendance("");
    setPhone("");
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    let data = record.filter((item) => item.id != id);
    localStorage.setItem("students", JSON.stringify(data));
    setRecord(data);
  };

  const handleEdit = (id) => {
    let singleData = record.find((item) => item.id == id);
    setName(singleData.name);
    setSub(singleData.sub);
    setMarks(singleData.marks);
    setAttendance(singleData.attendance);
    setPhone(singleData.phone);
    setEditIndex(id);
  };

  const handleFilter = () => {
    let originalData = JSON.parse(localStorage.getItem("students"));
    let filteredRecords =
      cat === "all"
        ? originalData
        : originalData.filter((item) => item.sub === cat);
    setRecord(filteredRecords);
  };

  const searchedAndSortedData = record
    .filter((item) => item.name.toLowerCase().includes(term.toLowerCase()))
    .sort((a, b) => (sort === "asc" ? a.marks - b.marks : b.marks - a.marks));

  return (
    <div style={{ fontFamily: '"poppins", sans-serif' }}>
      <h3>Student Crud</h3>
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
        <br />
      </form>

      {/* Filtering */}
      <Box>
        <FormControl sx={{ width: "15%" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            label=""
            onChange={(e) => setCat(e.target.value)}
          >
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
          onChange={(e) => setTerm(e.target.value)}
          sx={{
            width: "15%",
            fontFamily: '"poppins", sans-serif',
            float: "right",
            marginRight: "5%",
          }}
        ></TextField>

        {/* Sorting */}
        <FormControl sx={{ width: "15%" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label=""
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value={"asc"}>Asc</MenuItem>
            <MenuItem value={"desc"}>Desc</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <br />

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
