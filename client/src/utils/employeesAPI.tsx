//Functions

interface IEmployee {
  displayName: string;
  firstName: string;
  lastName: string;
  position: string;
}

const url = `http://localhost:3000/api/v1/employees`;

const formatToPOSTEmployees = (data: IEmployee) => {
  return {
    display_name: data.displayName,
    is_active: true,
    position: data.position,
    first_name: data.firstName,
    last_name: data.lastName,
  };
};

const postEmployee = async (data: IEmployee) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formatToPOSTEmployees(data)),
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export { postEmployee };
