"use client";
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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

//Components
import DisplayTopRow from "./DisplayTopRow";
import DisplayEmployeeCells from "./DisplayEmployeeCells";
import TotalHoursByDay from "./TotalHoursByDay";
import DateNavbar from "./DateNavbar";
import AddEmployeeModal from "./AddEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import CircularProgress from "@mui/material/CircularProgress";

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
import { Typography } from "@mui/material";

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
  const [openModalAddEmployee, setOpenModalAddEmployee] = useState(false);
  const [openModalDelEmployee, setOpenModalDelEmployee] = useState(false);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  //useRef
  // const windowWidth = useRef(window.innerWidth);

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
  console.log(windowSize); //858px minimum

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    if (employees === null) {
      setLoading(true);
    } else setLoading(false);
  }, [employees, fetchedShifts]);

  // useEffect(() => {}, [windowWidth]);

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

  //Render spinner when the first load of employees
  if (loading)
    return (
      <Container>
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );

  //Render simple message if screen smaller then 750px
  if (windowSize[0] <= 750)
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="success" variant="h5">
          The minimum screen size for this app is 750px.
        </Typography>
      </Container>
    );

  //Render schedule
  if (employees && shifts && computedValuesByDay)
    return (
      <ShiftsContext.Provider value={shifts}>
        <DispatchContext.Provider value={dispatch}>
          <ValuesByDayDispatchContext.Provider value={valuesByDayDispatch}>
            <ValuesByEmployeeDispatchContext.Provider
              value={valuesByEmployeeDispatch}
            >
              <Container sx={{ minWidth: 500 }}>
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
                    <Grid container wrap="wrap">
                      <Grid
                        container
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <DisplayTopRow
                          weekDays={TOP_ROW}
                          weekStart={createDate(weekStart)}
                        />
                      </Grid>
                      <Grid
                        container
                        // spacing={0}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <DisplayEmployeeCells
                          employees={employees}
                          weekStart={weekStart}
                          computedValuesByEmployee={computedValuesByEmployee}
                        />
                      </Grid>

                      <Grid
                        container
                        sx={{ flexGrow: 1, marginLeft: 0, padding: 0 }}
                      >
                        <TotalHoursByDay computedValues={computedValuesByDay} />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ m: (theme) => theme.spacing(1), ml: 0 }}
                  onClick={() => setOpenModalAddEmployee(true)}
                >
                  Add Employee
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ m: (theme) => theme.spacing(1), ml: 0 }}
                  onClick={() => setOpenModalDelEmployee(true)}
                >
                  Delete Employee
                </Button>
                <AddEmployeeModal
                  open={openModalAddEmployee}
                  handleOnClose={() => setOpenModalAddEmployee(false)}
                />
                <DeleteEmployeeModal
                  open={openModalDelEmployee}
                  handleOnClose={() => setOpenModalDelEmployee(false)}
                />
              </Container>
            </ValuesByEmployeeDispatchContext.Provider>
          </ValuesByDayDispatchContext.Provider>
        </DispatchContext.Provider>
      </ShiftsContext.Provider>
    );
};

export default Schedule;
