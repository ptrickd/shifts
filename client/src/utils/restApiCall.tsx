//Functions

interface IData {
  id?: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  weekStart: string;
}

const url = `http://localhost:3000/api/v1/shifts`;

const formatToPOST = (data: IData) => {
  // const weekStart = computeWeekStart(new Date(data.date));
  return {
    employee_id: data.employeeId,
    date: data.date,
    start_time: `${data.startTime}:00`,
    end_time: `${data.endTime}:00`,
    is_split_shift: false,
    week_start: data.weekStart,
  };
};

const postShift = async (data: IData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formatToPOST(data)),
  });
  return await response.json();
};

const putShift = async (data: IData) => {
  const response = await fetch(`${url}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formatToPOST(data)),
  });
  //if response.error then do this
  return await response.json();
};

//change name of the for shiftApiCall????
const deleteShift = async (id: number) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return { data };
  } else return { error: response.statusText };
};
export { postShift, putShift, deleteShift };
