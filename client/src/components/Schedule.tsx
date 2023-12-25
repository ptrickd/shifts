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
import BottomRow from "./BottomRow";
import DateNavbar from "./DateNavbar";

//Context
import { shiftsReducer, SHIFTS_ACTIONS } from "../context/shiftsReducer";

import {
  computedValuesReducer,
  VALUES_ACTIONS,
} from "../context/computedValuesReducer";

export const ShiftsContext = createContext<IShift[] | []>([]);
export const DispatchContext = createContext<Dispatch<IShiftsAction> | null>(
  null
);

//Functions
import { computeWeekStart, computeNewWeekStart } from "../utils/date";

// Custom Hooks
import useFetchEmployees from "../hooks/useFetchEmployees";
import useFetchShifts from "../hooks/useFetchShifts";

const Schedule = () => {
  //Constants
  const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = new Date(Date.now());

  //useState
  const [weekStart, setWeekStart] = useState<string>(computeWeekStart(TODAY));

  //Hooks
  const { employees } = useFetchEmployees();
  const { shifts: fetchedShifts } = useFetchShifts(weekStart);

  //Context
  const [shifts, dispatch] = useReducer(shiftsReducer, fetchedShifts);
  const [computedValues, valuesDispatch] = useReducer(
    computedValuesReducer,
    []
  );

  //update the reducer when shifts are fetcheds
  useEffect(() => {
    dispatch({
      type: SHIFTS_ACTIONS.SET_SHIFTS,
      payload: fetchedShifts,
    });
  }, [fetchedShifts]);

  useEffect(() => {
    valuesDispatch({ type: VALUES_ACTIONS.SET_VALUES, payload: fetchedShifts });
  }, [fetchedShifts]);

  useEffect(() => {
    console.log(computedValues);
  }, [computedValues]);

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
                    <DisplayTopRow
                      weekDays={TOP_ROW}
                      today={TODAY}
                      weekStart={new Date(weekStart)}
                    />
                  </Grid>

                  <DisplayEmployeeCells
                    employees={employees}
                    weekStart={weekStart}
                  />
                  <Grid container item spacing={1}>
                    <BottomRow />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
