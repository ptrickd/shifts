//React
import {
  useEffect,
  useState,
  useReducer,
  createContext,
  Dispatch,
} from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//Components
import DisplayTopRow from "./DisplayTopRow";
import DisplayEmployeeCells from "./DisplayEmployeeCells";
import DateNavbar from "./DateNavbar";

//Context
import { shiftsReducer, ACTIONS } from "../context/Reducer";
export const ShiftsContext = createContext<IShift[] | []>([]);
export const DispatchContext = createContext<Dispatch<IAction> | null>(null);

//Functions
import { computeWeekStart, computeNewWeekStart } from "../utils/date";

const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());

  //useState
  const [weekStart, setWeekStart] = useState<string>(computeWeekStart(TODAY));
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);

  //Context
  const [shifts, dispatch] = useReducer(shiftsReducer, []);

  //useEffect
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/employees.json"
      );

      const data = await response.json();
      console.log(response.ok);
      // console.log(data);
      const formatedEmployeesObject = data.map(
        (employee: IResponseEmployee) => {
          return { id: employee.id, displayName: employee.display_name };
        }
      );
      setEmployees(formatedEmployeesObject);
    };

    fetchEmployees();
  }, []);
  useEffect(() => {
    const fetchShifts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/shifts/?week_start=${weekStart}`
      );
      const data = await response.json();
      // console.log(WEEK_START);
      console.log(data);
      const formatedShiftsObject: IShift[] | [] = data.map(
        (shift: IResponseShift) => {
          return {
            employeeId: shift.employee_id,
            date: shift.date,
            startTime: shift.start_time.substring(11, 16),
            endTime: shift.end_time.substring(11, 16),
          };
        }
      );
      console.log(formatedShiftsObject);
      if (formatedShiftsObject.length > 0) {
        dispatch({ type: ACTIONS.SET_SHIFTS, payload: formatedShiftsObject });
      }
    };
    fetchShifts();
  }, [weekStart]);

  if (employees && shifts)
    return (
      <ShiftsContext.Provider value={shifts}>
        <DispatchContext.Provider value={dispatch}>
          <Container>
            <DateNavbar
              date={weekStart}
              newShifts={(direction) =>
                setWeekStart(computeNewWeekStart(weekStart, direction))
              }
            />

            <Box
              component="div"
              sx={{
                flexGrow: 1,
                border: "1px solid gray",
              }}
            >
              <Grid container spacing={1}>
                <Grid container item spacing={1}>
                  <DisplayTopRow weekDays={TOP_ROW} today={TODAY} />
                </Grid>

                <DisplayEmployeeCells
                  employees={employees}
                  weekStart={weekStart}
                />
              </Grid>
            </Box>
          </Container>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
