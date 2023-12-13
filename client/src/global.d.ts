//Can't have import or export in this file
//Reducer action
enum ACTIONS {
  SET_SHIFTS = "SET_SHIFTS",
  ADD_SHIFT = "ADD_SHIFT",
  UPDATE_SHIFT = "UPDATE_SHIFT",
  DELETE_SHIFT = "DELETE_SHIFT",
}

interface IAction {
  type: ACTIONS.SET_SHIFTS | ACTIONS.ADD_SHIFT | UPDATE_SHIFT;
  payload?: IShift[] | [] | IShift;
}

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
}
