import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_API_URL } from "./globals";
import "./MemberEdit.css";

const MemberEdit = () => {
  const [id_mem, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState(null); // แก้ให้เป็น Date object
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      fetchMember();
    }
  }, [id]);

  const fetchMember = async () => {
    try {
      const response = await axios.post(`${BASE_API_URL}/members/searchid`, { id_mem: id });
      const user = response.data.user;
      setId(user.id_mem);
      setName(user.name_mem);
      setEmail(user.email_mem);
      setPassword(user.password_mem);
      setSex(user.sex_mem);
      setBirthday(user.birthday_mem ? new Date(user.birthday_mem) : null); // แปลงเป็น Date object
      setPhone(user.phone_mem);
      setAddress(user.address_mem);
      setZipcode(user.zipcode_mem);
      setCountry(user.country_mem);
    } catch (error) {
      alert("ไม่สามารถดึงข้อมูลสมาชิกได้");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูล");
    if (userConfirmed) {
      try {
        const formattedBirthday = birthday
          ? `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, "0")}-${birthday.getDate().toString().padStart(2, "0")}`
          : null;

        await axios.put(`${BASE_API_URL}/membersedit`, {
          id_mem,
          name_mem: name,
          email_mem: email,
          password_mem: password,
          sex_mem: sex,
          birthday_mem: formattedBirthday,
          phone_mem: phone,
          address_mem: address,
          zipcode_mem: zipcode,
          country_mem: country,
        });

        alert("แก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว");
        navigate("/search");
      } catch (error) {
        alert("ไม่สามารถแก้ไขข้อมูลสมาชิกได้");
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิกนี้?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_API_URL}/membersdel`, {
          data: { id_mem },
        });
        alert("ลบสมาชิกเรียบร้อยแล้ว");
        navigate("/search");
      } catch (error) {
        alert("ไม่สามารถลบข้อมูลสมาชิกได้");
      }
    }
  };

  const handleCancel = () => {
    navigate("/search");
  };

  return (
    <div className="container">
      <h2>Edit Member</h2>
      <form onSubmit={handleEdit} className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Sex:</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)} required>
            <option value="1">ชาย</option>
            <option value="2">หญิง</option>
          </select>
        </div>
        <div className="form-group">
          <label>Birthday:</label>
          <DatePicker
            selected={birthday}
            onChange={(date) => setBirthday(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select a date"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="4" required />
        </div>
        <div className="form-group">
          <label>Zipcode:</label>
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MemberEdit;
