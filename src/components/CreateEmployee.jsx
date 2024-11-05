import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeId = location.state?.id;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/employees/${employeeId}`
          );
          if (!response.ok) {
            throw new Error("Error fetching employee data");
          }
          const data = await response.json();
          setFormData({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            designation: data.designation,
            gender: data.gender,
            courses: data.courses || [],
            image: null,
          });
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      };

      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const newCourses = checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value);
        return { ...prevData, courses: newCourses };
      });
    } else if (type === "file") {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "courses") {
        formData.courses.forEach((course) => {
          formDataToSend.append("courses[]", course);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        employeeId
          ? `http://localhost:5000/api/employees/${employeeId}`
          : "http://localhost:5000/api/employees/create",
        {
          method: employeeId ? "PUT" : "POST",
          body: formDataToSend,
        }
      );
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(
          "Employee creation/updating failed. Please check your inputs."
        );
      }

      const data = await response.json();
      console.log("Employee created/updated:", data);
      navigate("/dashboard/employee");
    } catch (error) {
      console.error("Error creating/updating employee:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {employeeId ? "Edit Employee" : "Create Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label
            className="w-1/3 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center">
          <label
            className="w-1/3 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center">
          <label
            className="w-1/3 text-sm font-medium text-gray-700"
            htmlFor="mobile"
          >
            Mobile No
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center">
          <label
            className="w-1/3 text-sm font-medium text-gray-700"
            htmlFor="designation"
          >
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select Designation
            </option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="w-2/3 flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
                className="mr-1"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
                className="mr-1"
              />
              Female
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-sm font-medium text-gray-700">
            Course
          </label>
          <div className="w-2/3 flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                value="MCA"
                checked={formData.courses.includes("MCA")}
                onChange={handleChange}
                className="mr-1"
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                checked={formData.courses.includes("BCA")}
                onChange={handleChange}
                className="mr-1"
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                checked={formData.courses.includes("BSC")}
                onChange={handleChange}
                className="mr-1"
              />
              BSC
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <label
            className="w-1/3 text-sm font-medium text-gray-700"
            htmlFor="image"
          >
            Img Upload
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {employeeId ? "Update Employee" : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
