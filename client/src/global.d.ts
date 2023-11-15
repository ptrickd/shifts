//Response from the server when
//calling Employees#index
interface IResponseEmployee {
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
  displayName: string;
}
