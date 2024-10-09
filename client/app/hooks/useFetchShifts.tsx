import { useEffect, useState } from "react";

const useFetchShifts = (weekStart: string) => {
  const [shifts, setShifts] = useState<IShift[] | []>([]);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchShifts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}shifts/?week_start=${weekStart}`
      );
      const data = await response.json();

      const formatedShiftsObject: IShift[] | [] = data.map(
        (shift: IResponseShift) => {
          return {
            id: shift.id,
            employeeId: shift.employee_id,
            date: shift.date,
            startTime: shift.start_time.substring(11, 16),
            endTime: shift.end_time.substring(11, 16),
            weekStart: shift.week_start,
          };
        }
      );

      if (formatedShiftsObject) {
        setShifts(formatedShiftsObject);
      }
    };

    try {
      fetchShifts();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [weekStart, setShifts]);
  return { shifts, error };
};

export default useFetchShifts;
