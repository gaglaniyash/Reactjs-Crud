import React, { useState } from "react";

export default function LocalCrud() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, seteditIndex] = useState(null);

  const handleSubmit = () => {
    if (editIndex == null) {
      let obj = { id: Date.now(), name, email, gender, city };
      setRecord([...record, obj]);
    } else {
      const singleData = record.find((item) => item.id == editIndex);
      singleData.name = name;
      singleData.email = email;
      singleData.gender = gender;
      singleData.city = city;
    }

    setName("");
    setEmail("");
    setGender("");
    setCity("");
    seteditIndex(null)
  };

  const handleDelete = (id) => {
    const deletedData = record.filter((item) => item.id != id);
    setRecord(deletedData);
  };

  const handleEdit = (id) => {
  const singleData = record.find((item) => item.id == id);
  setName(singleData.name )
  setEmail(singleData.email)
  setGender(singleData.gender) 
  setCity(singleData.city)
  seteditIndex(id)
  };

  return (
    <div>
      <h2>LocalCrud</h2>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        className="form-control"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="Gender">Gender :</label>
      <label htmlFor="Gender">Male</label>
      <input
        type="radio"
        value={"male"}
        checked={gender == "male" ? true : false}
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="GEnder">Female</label>
      <input
        type="radio"
        value={"female"}
        checked={gender == "female" ? true : false}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="City">City:</label>
      <select
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className="form-control"
      >
        <option value="select">--Select--</option>
        <option value="Rajkot">Rajkot</option>
        <option value="Ahemdabad">Ahemdabad</option>
        <option value="Surat">Surat</option>
      </select>
      <br />
      <button onClick={handleSubmit} className="btn btn-success">
        {editIndex == null ? "Submit" : "Update"}
      </button>
      <br />
      <br />
      <table className="table border">
        <thead>
          <tr>
            <th scope="col">Sr.no</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">City</th>
            <th scope="colspan=2">Action</th>
          </tr>
        </thead>

        {record.map((e, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.gender}</td>
                <td>{e.city}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(e.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}