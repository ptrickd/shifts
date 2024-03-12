//
export enum EMPLOYEES_ACTIONS {
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
}
interface IEmployee {
  displayName: string;
  firstName: string;
  lastName: string;
  position: string;
}
interface IEmployeesAction {
  type: string;
  payload: IEmployee;
}
interface IEmployeesAction {}
export function employeesReducer(
  employees: IEmployee[] | [],
  action: IEmployeesAction
): IEmployee[] {
  switch (action.type) {
    case EMPLOYEES_ACTIONS.ADD_EMPLOYEE:
      if (action.payload) {
        //
        return employees;
      } else return employees;
    default:
      return employees;
  }
}
