import * as Constant from "./actionTypes";
import axios from "axios";

export const fetchAbsenceData = async (dispatch) => {
  try {
    const API_URL = `${process.env.REACT_APP_API_URL}absences`;
    const response = await axios.get(API_URL);
    if (Array.isArray(response.data)) {
      const transformedAbsenceData = response.data.map((absence) => {
        const fullName = `${absence.employee.firstName} ${absence.employee.lastName}`;
        const endDate = calculateEndDate(absence.startDate, absence.days);
        const startDate = formatDate(absence.startDate);
        return {
          ...absence,
          fullName,
          endDate,
          startDate,
        };
      });
      dispatch({
        type: Constant.FETCH_ABSENCES_SUCCESS,
        payload: transformedAbsenceData,
      });
    } else {
      throw new Error("Response is not an array");
    }
  } catch (err) {
    dispatch({ type: Constant.FETCH_ABSENCES_FAILURE, payload: err.message });
  }
};
const formatDate = (timestamp) => {
  return new Date(timestamp).toISOString().split("T")[0];
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; //checks whether the days are weekends
};

const holidays = ["2024-05-02", "2024-12-25", "2024-01-01"];

const isHoliday = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  return holidays.includes(formattedDate);
};

const calculateEndDate = (startDate, days) => {
  const start = new Date(startDate);
  // endDate.setDate(start.getDate() + parseInt(leaveDays)); // return endate if not considering weekend/holiday
  let leaveDays = parseInt(days); // Number of leave days to add
  let endDate = new Date(start);
  while (leaveDays > 0) {
    endDate.setDate(endDate.getDate() + 1); // Move to the next day
    if (isWeekend(endDate) || isHoliday(endDate)) {
      continue; //skip it if true
    }
    // Count only if it's a valid working day (not weekend/holiday)
    leaveDays--;
  }
  return formatDate(endDate);
};

export const sortAbsences = (sortKey) => ({
  type: Constant.SORT_ABSENCES,
  payload: { sortKey },
});

export const showAbsenceUnfiltered = () => ({
  type: Constant.UNFILTERED_ABSENCES,
});

export const showEmployeeAbsences = (employeeId) => ({
  type: Constant.SELECTED_EMPLOYEE_ABSENCES,
  payload: employeeId,
});

export const openModal = (employeeId) => ({
  type: Constant.OPEN_MODAL,
  payload: employeeId,
});

export const closeModal = () => ({
  type: Constant.CLOSE_MODAL,
});

export const fetchConflicts = async (employeeId, dispatch) => {
  try {
    const API_URL = `${process.env.REACT_APP_API_URL}conflict/${employeeId}`;
    const response = await axios.get(API_URL);
    // const response = await fetch(API_URL);
    // if (!response.ok) {
    // throw new Error("Failed to check conflict");
    // }
    // const conflictResponse = await response.json();
    dispatch({
      type: Constant.CHECK_CONFLICT_SUCCESS,
      payload: response.data.conflicts,
    });
  } catch (err) {
    dispatch({ type: Constant.CHECK_CONFLICT_FAILURE, payload: err.message });
  }
};
