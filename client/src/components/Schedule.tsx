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
import TotalHoursByDay from "./TotalHoursByDay";
import DateNavbar from "./DateNavbar";

//Context
import { shiftsReducer, SHIFTS_ACTIONS } from "../reducer/shiftsReducer";

import {
  computedTotalHoursByDay,
  VALUES_ACTIONS,
} from "../reducer/computedTotalHoursByDay";
import { computedTotalHoursByEmployee } from "../reducer/computedTotalHoursByEmployee";

import { createDate } from "../utils/date";
export const ShiftsContext = createContext<IShift[] | []>([]);
export const DispatchContext = createContext<Dispatch<IShiftsAction> | null>(
  null
);

export const ValuesByDayDispatchContext =
  createContext<Dispatch<IValuesByDayAction> | null>(null);

export const ValuesByEmployeeDispatchContext =
  createContext<Dispatch<IValuesByEmployeeAction> | null>(null);

//Functions
import { computeWeekStart, computeNewWeekStart } from "../utils/date";

// Custom Hooks
import useFetchEmployees from "../hooks/useFetchEmployees";
import useFetchShifts from "../hooks/useFetchShifts";

const Schedule = () => {
  //Constants
  const TOP_ROW = [
    "Names",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Total",
  ];
  const TODAY = new Date(Date.now());

  //useState
  const [weekStart, setWeekStart] = useState<string>(computeWeekStart(TODAY));

  //Hooks
  const { employees } = useFetchEmployees();
  const { shifts: fetchedShifts } = useFetchShifts(weekStart);

  //Context
  const [shifts, dispatch] = useReducer(shiftsReducer, fetchedShifts);

  const [computedValuesByDay, valuesByDayDispatch] = useReducer(
    computedTotalHoursByDay,
    []
  );

  const [computedValuesByEmployee, valuesByEmployeeDispatch] = useReducer(
    computedTotalHoursByEmployee,
    new Map()
  );

  //update the reducer when shifts are fetcheds
  useEffect(() => {
    dispatch({
      type: SHIFTS_ACTIONS.SET_SHIFTS,
      payload: fetchedShifts,
    });
  }, [fetchedShifts]);

  useEffect(() => {
    valuesByDayDispatch({
      type: VALUES_ACTIONS.SET_VALUES,
      payload: fetchedShifts,
    });
  }, [fetchedShifts]);

  useEffect(() => {
    valuesByEmployeeDispatch({
      type: VALUES_ACTIONS.SET_VALUES,
      payload: fetchedShifts,
    });
  }, [fetchedShifts]);

  if (employees && shifts && computedValuesByDay)
    return (
      <ShiftsContext.Provider value={shifts}>
        <DispatchContext.Provider value={dispatch}>
          <ValuesByDayDispatchContext.Provider value={valuesByDayDispatch}>
            <ValuesByEmployeeDispatchContext.Provider
              value={valuesByEmployeeDispatch}
            >
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
                          weekStart={createDate(weekStart)}
                        />
                      </Grid>

                      <DisplayEmployeeCells
                        employees={employees}
                        weekStart={weekStart}
                        computedValuesByEmployee={computedValuesByEmployee}
                      />
                      <Grid
                        container
                        item
                        spacing={1}
                        sx={{ flexGrow: 1, marginLeft: 0, padding: 0 }}
                      >
                        <TotalHoursByDay computedValues={computedValuesByDay} />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Container>
            </ValuesByEmployeeDispatchContext.Provider>
          </ValuesByDayDispatchContext.Provider>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
