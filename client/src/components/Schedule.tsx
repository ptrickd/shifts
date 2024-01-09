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
export const ValuesDispatchContext =
  createContext<Dispatch<IValuesAction> | null>(null);

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
  useEffect(() => {
    console.log(`weekStart: ${weekStart}`);
  }, [weekStart]);
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

  useEffect(() => {}, [computedValues]);

  if (employees && shifts && computedValues)
    return (
      <ShiftsContext.Provider value={shifts}>
        <DispatchContext.Provider value={dispatch}>
          <ValuesDispatchContext.Provider value={valuesDispatch}>
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
                    <Grid
                      container
                      item
                      spacing={1}
                      sx={{ flexGrow: 1, marginLeft: 0, padding: 0 }}
                    >
                      <BottomRow computedValues={computedValues} />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>
          </ValuesDispatchContext.Provider>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
