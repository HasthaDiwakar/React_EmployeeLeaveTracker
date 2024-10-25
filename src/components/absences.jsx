import React, { useEffect, useReducer } from "react";
import initialState from "../redux/reducers/initialState";
import absenceReducer from "../redux/reducers/absenceReducer";
import AbsenceDetails from "./absenceDetails";
import {
  fetchAbsenceData,
  sortAbsences,
  showEmployeeAbsences,
  openModal,
  showAbsenceUnfiltered,
} from "../redux/actions/absenceActions";
import { Button } from "@headlessui/react";

const Absences = () => {
  const [state, dispatch] = useReducer(absenceReducer, initialState);

  useEffect(() => {
    fetchAbsenceData(dispatch);
  }, []);

  const handleEmployeeClick = (employeeId) => {
    dispatch(showEmployeeAbsences(employeeId));
  };

  const handleDetailsClick = (event, employeeId) => {
    dispatch(openModal(employeeId));
  };

  const requestSort = (event, sortKey) => {
    dispatch(sortAbsences(sortKey));
  };
  const handleBackClick = () => {
    dispatch(showAbsenceUnfiltered());
  };

  if (state.loading) return <div className="text-center">Loading...</div>;
  //   if (error)
  //     return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <table className="min-w-full border bg-white">
        <thead>
          <tr className="bg-blue-200">
            <th
              onClick={(e) => requestSort(e, "fullName")}
              className="cursor-pointer p-2"
            >
              Employee Name
              {state.sortKey === "fullName"
                ? state.sortDirection === "ascending"
                  ? "↑"
                  : "↓"
                : "⇵"}
            </th>
            <th
              onClick={(e) => requestSort(e, "absenceType")}
              className="cursor-pointer p-2"
            >
              Absence Type
              {state.sortKey === "absenceType"
                ? state.sortDirection === "ascending"
                  ? "↑"
                  : "↓"
                : "⇵"}
            </th>
            <th
              onClick={(e) => requestSort(e, "approved")}
              className="cursor-pointer p-2"
            >
              Status{" "}
              {state.sortKey === "approved"
                ? state.sortDirection === "ascending"
                  ? "↑"
                  : "↓"
                : "⇵"}
            </th>
            <th
              onClick={(e) => requestSort(e, "startDate")}
              className="cursor-pointer p-2"
            >
              Start Date{" "}
              {state.sortKey === "startDate"
                ? state.sortDirection === "ascending"
                  ? "↑"
                  : "↓"
                : "⇵"}
            </th>
            <th
              onClick={(e) => requestSort(e, "endDate")}
              className="cursor-pointer p-2"
            >
              End Date{" "}
              {state.sortKey === "endDate"
                ? state.sortDirection === "ascending"
                  ? "↑"
                  : "↓"
                : "⇵"}
            </th>
            <th className="px-4 py-2 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {state.filteredAbsences &&
            Array.isArray(state.filteredAbsences) &&
            state.filteredAbsences.map((absence) => (
              <tr key={absence.id}>
                <td
                  className="px-4 py-2 border"
                  onClick={() => handleEmployeeClick(absence.employee.id)}
                >
                  {absence.fullName}
                </td>
                <td className="px-4 py-2 border">{absence.absenceType}</td>
                <td
                  className={
                    absence.approved
                      ? " px-4 py-2 border"
                      : " px-4 py-2 border text-red-600"
                  }
                >
                  {absence.approved ? "Approved" : "Pending Approval"}
                </td>
                <td className="px-4 py-2 border">{absence.startDate}</td>
                <td className="px-4 py-2 border">{absence.endDate}</td>
                <td className="px-10 py-2 border">
                  <img
                    onClick={(e) => handleDetailsClick(e, absence.id)}
                    src="/assests/images/info-icon.png"
                    alt="Info icon"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pass the state and dispatch to the modal component */}
      <AbsenceDetails
        isModalOpen={state.isModalOpen}
        employeeId={state.selectedEmployeeId}
        dispatch={dispatch}
        conflicts={state.conflicts}
      />
      {state.selectedEmployeeId && (
        <Button
          className="btn btn-primary cursor-pointer p-2"
          onClick={() => {
            handleBackClick();
          }}
        >
          Back
        </Button>
      )}
    </div>
  );
};

export default Absences;
