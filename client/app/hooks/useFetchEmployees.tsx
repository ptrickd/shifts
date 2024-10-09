import { useEffect, useState } from "react";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_SERVER_URL}employees.json"
      );

      const data = await response.json();
      const formatedEmployeesObject: IEmployee[] = data.map(
        (employee: IResponseEmployee) => {
          return { id: employee.id, displayName: employee.display_name };
        }
      );
      setEmployees(formatedEmployeesObject);
    };

    try {
      fetchEmployees();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, []);

  return { employees, error };
};

export default useFetchEmployees;
