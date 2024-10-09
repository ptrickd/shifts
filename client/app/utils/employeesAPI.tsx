//Functions

interface IEmployee {
  firstName: string;
  lastName: string;
  displayName: string;
  position: string;
}

const url = `${process.env.NEXT_PUBLIC_SERVER_URL}employees`;

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
  console.log(data);
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

//http://localhost:3000/api/v1/employees/14
const deleteEmployee = async (id: string) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    return { error };
  }
};

export { postEmployee };
