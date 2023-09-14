import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import FormItem from "antd/es/form/FormItem";
import { Radio } from "antd";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
function Register() {
  const [value1, setValue1] = useState("Male");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  // const dateFormat = "YYYY/MM/DD";
  const [birthDate, setBirthDate] = useState("");
  const [years, setYears] = useState(null);
  const [months, setMonths] = useState(null);
  const [days, setDays] = useState(null);

  const calculateAge = (birthDate) => {
    if (!birthDate) return;

    const currentDate = new Date();
    if (new Date(birthDate) > currentDate) {
      setBirthDate("");
      setYears(null);
      setMonths(null);
      setDays(null);
      alert("Invalid Date of Birth");
      return;
    }

    const diffTime = currentDate - new Date(birthDate);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setYears(Math.floor(totalDays / 365.25));
    setMonths(Math.floor((totalDays % 365.25) / 30.4375));
    setDays(Math.floor((totalDays % 365.25) % 30.4375));
  };

  const plainOptions = ["Male", "Female", "Other"];
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        values
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title"> Register for Frequent Research </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="FirstName" name="firstname">
            <Input
              placeholder="FirstName"
              id="Firstname"
              name="Firstname"
              type="text"
              pattern="[A-Za-z\s]*$"
              required
            />
          </Form.Item>{" "}
          <Form.Item label="LastName" name="lastname">
            <Input
              placeholder="LastName"
              id="LastName"
              name="LastName"
              type="text"
              pattern="[A-Za-z\s]*$"
              required
            />
          </Form.Item>
          <Form.Item label="Email" >
            <Input placeholder="Email" pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}" />
          </Form.Item>{" "}
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <FormItem label="Country" >
            <Select
              options={countries}
              value={selectedCountry}
              onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
          </FormItem>
          <FormItem label="Gender" >
            <Radio.Group
              options={plainOptions}
              onChange={onChange1}
              value={value1}
            />
          </FormItem>
          <FormItem label="DOB" >
            <input
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                calculateAge(e.target.value);
              }}
            />
          </FormItem>
          <FormItem label="Age" >
            {birthDate && (
              <p>
                Your age is {years} years, {months} months, and {days} days
              </p>
            )}
          </FormItem>
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER{" "}
          </Button>
          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN{" "}
          </Link>{" "}
        </Form>{" "}
      </div>{" "}
    </div>
  );
}

export default Register;
