//Can't have import or export in this file
//Reducer action
enum SHIFTS_ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
  ADD_SHIFT = "ADD_SHIFT",
  UPDATE_SHIFT = "UPDATE_SHIFT",
  DELETE_SHIFT = "DELETE_SHIFT",
}

interface IShiftsAction {
  type:
    | SHIFTS_ACTIONS.SET_SHIFTS
    | SHIFTS_ACTIONS.ADD_SHIFT
    | SHIFTS_ACTIONS.UPDATE_SHIFT
    | SHIFTS_ACTIONS.DELETE_SHIFT;
  payload?: IShift[] | [] | IShift;
}

/******************************************/

enum VALUES_ACTIONS {
  SET_VALUES = "SET_VALUES",
  ADD_VALUES = "ADD_VALUES",
  SUBSTRACT_VALUES = "SUBSTRACT_VALUES",
}
//find interface for map object.

interface INewByDayTotal {
  day: number;
  totalHours: number;
}

interface ITotalHoursByEmployee {
  hoursByDay: numbers[];
  totalHours: number;
}

type TComputedTotalHoursByEmployee = Map<number, ITotalHoursByEmployee>;

interface IComputedTotalHoursByDay {
  total: number;
}

interface IValuesByDayAction {
  type:
    | VALUES_ACTIONS.SET_VALUES
    | VALUES_ACTIONS.ADD_VALUES
    | VALUES_ACTIONS.SUBSTRACT_VALUES;
  payload?: IShift[] | [] | IComputedTotalHoursByDay | IShift | INewByDayTotal;
}

interface IValuesByEmployeeAction {
  type:
    | VALUES_ACTIONS.SET_VALUES
    | VALUES_ACTIONS.ADD_VALUES
    | VALUES_ACTIONS.SUBSTRACT_VALUES;
  payload?: IShift[] | [] | IShift;
}

/******************************************/
//Response from the server when
//calling Employees#index
interface IResponseEmployee {
  id: number;
  isActive: boolean;
  position: string;
  first_name: string;
  last_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

//Response from the server when
//calling Shifts#index
interface IResponseShift {
  id: number;
  employee_id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_split_shift: boolean;
  created_at: string;
  updated_at: string;
  week_start: string;
}

interface IEmployee {
  id: number;
  displayName: string;
}
interface IShift {
  id: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  weekStart: string;
}
