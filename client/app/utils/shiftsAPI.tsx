//Functions

interface IShifts {
  id?: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  weekStart: string;
}

const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/shifts`;

const formatToPOSTShifts = (data: IShifts) => {
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
const postShift = async (data: IShifts) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formatToPOSTShifts(data)),
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

const putShift = async (data: IShifts) => {
  try {
    const response = await fetch(`${url}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formatToPOSTShifts(data)),
    });
    //if response.error then do this
    return await response.json();
  } catch (error) {
    return { error };
  }
};

//change name of the for shiftApiCall????
const deleteShift = async (id: number) => {
  try {
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
  } catch (error) {
    return { error };
  }
};

export { postShift, putShift, deleteShift };
