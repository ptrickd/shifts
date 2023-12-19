//React
import {
  useState,
  useReducer,
  useEffect,
  createContext,
  Dispatch,
} from "react";

//Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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

// Custom Hooks
import useFetchEmployees from "../hooks/useFetchEmployees";
import useFetchShifts from "../hooks/useFetchShifts";

const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());
  console.log(TODAY);
  //useState
  const [weekStart, setWeekStart] = useState<string>(computeWeekStart(TODAY));

  //Hooks
  const { employees } = useFetchEmployees();
  const { shifts: fetchedShifts } = useFetchShifts(weekStart);

  //Context
  const [shifts, dispatch] = useReducer(shiftsReducer, fetchedShifts);

  //update the reducer when shifts are fetcheds
  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_SHIFTS,
      payload: fetchedShifts,
    });
  }, [fetchedShifts]);

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
            <Paper elevation={1}>
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
            </Paper>
          </Container>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
