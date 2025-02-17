import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "./globals";
import "./MemberInsert.css";

const MemberInsert = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("1");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!window.confirm("ยืนยันการบันทึกข้อมูล?")) return;
    setLoading(true);
    try {
      await axios.post(`${BASE_API_URL}/membersadd`, {
        name_mem: name,
        email_mem: email,
        password_mem: password,
        sex_mem: sex,
        birthday_mem: birthday,
        phone_mem: phone,
        address_mem: address,
        zipcode_mem: zipcode,
        country_mem: country,
      });
      alert("เพิ่มสมาชิกเรียบร้อย");
      navigate("/search");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะเพิ่มสมาชิก:", error);
      alert("ไม่สามารถเพิ่มสมาชิกได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>เพิ่มสมาชิก</h2>
      <form onSubmit={handleAdd} className="form-container">
        <label>ชื่อ:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>อีเมล:</label>
        <input type="email" placeholder="ponglert.s@ubru.ac.th" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>รหัสผ่าน:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>เพศ:</label>
        <select value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="1">ชาย</option>
          <option value="2">หญิง</option>
        </select>

        <label>วันเกิด:</label>
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />

        <label>โทรศัพท์:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>ที่อยู่:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="5" required />

        <label>รหัสไปรษณีย์:</label>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />

        <label>ประเทศ:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />

        <div className="button-group">
          <button type="submit" disabled={loading} className="submit-button">บันทึก</button>
          <button onClick={() => navigate("/search")} disabled={loading} className="cancel-button">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
};

export default MemberInsert;