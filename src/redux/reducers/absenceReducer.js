import initialState from "./initialState";
import * as Constants from "../actions/actionTypes";

export default function absenceReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.FETCH_ABSENCES_SUCCESS:
      return {
        ...state,
        absences: action.payload,
        filteredAbsences: action.payload,
        loading: false,
      };
    case Constants.FETCH_ABSENCES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case Constants.CHECK_CONFLICT_SUCCESS:
      const absences = state.absences;

      return {
        ...state.conflicts,
        conflicts: action.payload,
        isModalOpen: true,
        absences,
        filteredAbsences: absences,
      };
    case Constants.UNFILTERED_ABSENCES:
      const unfiltered_absences = state.absences;

      return {
        ...state.conflicts,
        conflicts: action.payload,
        isModalOpen: false,
        absences: unfiltered_absences,
        filteredAbsences: unfiltered_absences,
      };
    case Constants.CHECK_CONFLICT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingModal: true,
      };
    case Constants.SORT_ABSENCES:
      const { sortKey } = action.payload;
      let sortedAbsences = [...state.filteredAbsences];
      sortedAbsences.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return state.sortDirection === "ascending" ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return state.sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredAbsences: sortedAbsences,
        sortKey,
        sortDirection:
          state.sortDirection === "ascending" ? "descending" : "ascending",
      };
    case Constants.SELECTED_EMPLOYEE_ABSENCES:
      const employeeAbsences = state.absences.filter(
        (absence) => absence.employee.id === action.payload
      );
      return {
        ...state,
        filteredAbsences: employeeAbsences,
        selectedEmployeeId: action.payload,
        isModalOpen: false,
        conflicts: undefined,
      };
    case Constants.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        selectedEmployeeId: action.payload,
        loading: false,
      };
    case Constants.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        selectedEmployeeId: null,
      };
    default:
      return state;
  }
}
