import { useEffect, useState } from "react";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<IResponseEmployee | null>(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/employees.json"
      );

      const data = await response.json();
      const formatedEmployeesObject = data.map(
        (employee: IResponseEmployee) => {
          return { id: employee.id, displayName: employee.display_name };
        }
      );
      setEmployees(formatedEmployeesObject);
    };

    fetchEmployees();
  }, []);

  return { employees };
};

export default useFetchEmployees;
