import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
        console.log("Employee data fetched:", data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      } else {
        console.error("Failed to delete the employee");
      }
    }
  };

  const handleActiveToggle = async (id) => {
    const employee = employees.find((emp) => emp._id === id);
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: !employee.active }),
    });
    setEmployees(
      employees.map((emp) =>
        emp._id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Employee Details
      </h2>

      <input
        type="text"
        placeholder="Search by Name or Email"
        className="border border-gray-300 p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th
              onClick={() => handleSort("uniqueId")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Unique ID
            </th>

            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              onClick={() => handleSort("email")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile No
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Create Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentEmployees.map((employee) => (
            <tr
              key={employee._id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.uniqueId}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="rounded-full w-10 h-10"
                />
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.name}
              </td>
              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.mobile}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.designation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.gender}
              </td>
              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                {employee.courses.join(", ")}
              </td>
              <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                {new Date(employee.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">
                <button
                  onClick={() => handleActiveToggle(employee._id)}
                  className="mr-2"
                >
                  {employee.active ? "Deactivate" : "Activate"}
                </button>
                <Link
                  to="/dashboard/employee/edit"
                  state={{ id: employee._id }}
                  className="mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="flex justify-center mt-4">
        <ul className="flex list-none">
          {[
            ...Array(
              Math.ceil(filteredEmployees.length / employeesPerPage)
            ).keys(),
          ].map((number) => (
            <li key={number + 1} className="mx-1">
              <button
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EmployeeDetails;
