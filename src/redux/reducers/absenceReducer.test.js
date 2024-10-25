// absenceReducer.test.js
import absenceReducer from "./absenceReducer";
import initialState from "./initialState";
import * as Constants from "../actions/actionTypes";

describe("absenceReducer", () => {
  it("should return the initial state", () => {
    expect(absenceReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_ABSENCES_SUCCESS", () => {
    const mockAbsences = [
      {
        id: 0,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 9,
        absenceType: "SICKNESS",
        employee: {
          firstName: "Rahaf",
          lastName: "Deckard",
          id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
        },
        approved: true,
      },
    ];

    const action = {
      type: Constants.FETCH_ABSENCES_SUCCESS,
      payload: mockAbsences,
    };

    const expectedState = {
      ...initialState,
      absences: mockAbsences,
      filteredAbsences: mockAbsences,
      loading: false,
    };

    expect(absenceReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_ABSENCES_FAILURE", () => {
    const action = {
      type: Constants.FETCH_ABSENCES_FAILURE,
      payload: "Failed to fetch absences",
    };

    const expectedState = {
      ...initialState,
      error: "Failed to fetch absences",
      loading: false,
    };

    expect(absenceReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CHECK_CONFLICT_SUCCESS", () => {
    const action = {
      type: Constants.CHECK_CONFLICT_SUCCESS,
      payload: true,
    };

    const currentState = {
      ...initialState,
      absences: [],
    };

    const expectedState = {
      ...currentState.conflicts,
      conflicts: true,
      isModalOpen: true,
      filteredAbsences: currentState.absences,
      absences: currentState.absences,
    };

    expect(absenceReducer(currentState, action)).toEqual(expectedState);
  });

  it("should handle SORT_ABSENCES", () => {
    const mockAbsences = [
      { id: 1, startDate: "2022-05-30T04:39:06.470Z", absenceType: "VACATION" },
      { id: 0, startDate: "2022-05-28T04:39:06.470Z", absenceType: "SICKNESS" },
    ];

    const action = {
      type: Constants.SORT_ABSENCES,
      payload: { sortKey: "startDate" },
    };

    const currentState = {
      ...initialState,
      filteredAbsences: mockAbsences,
      sortDirection: "ascending",
    };

    const expectedState = {
      ...currentState,
      filteredAbsences: [
        {
          id: 0,
          startDate: "2022-05-28T04:39:06.470Z",
          absenceType: "SICKNESS",
        },
        {
          id: 1,
          startDate: "2022-05-30T04:39:06.470Z",
          absenceType: "VACATION",
        },
      ],
      sortDirection: "descending",
    };

    expect(absenceReducer(currentState, action)).toEqual(expectedState);
  });

  it("should handle SELECTED_EMPLOYEE_ABSENCES", () => {
    const mockAbsences = [
      { id: 1, employee: { id: "1" }, absenceType: "SICKNESS" },
      { id: 2, employee: { id: "2" }, absenceType: "VACATION" },
    ];

    const action = {
      type: Constants.SELECTED_EMPLOYEE_ABSENCES,
      payload: "1",
    };

    const currentState = {
      ...initialState,
      absences: mockAbsences,
    };

    const expectedState = {
      ...currentState,
      filteredAbsences: [mockAbsences[0]],
      selectedEmployeeId: "1",
    };

    expect(absenceReducer(currentState, action)).toEqual(expectedState);
  });

  it("should handle OPEN_MODAL", () => {
    const action = {
      type: Constants.OPEN_MODAL,
      payload: "1",
    };

    const expectedState = {
      ...initialState,
      isModalOpen: true,
      selectedEmployeeId: "1",
      loading: false,
    };

    expect(absenceReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CLOSE_MODAL", () => {
    const action = {
      type: Constants.CLOSE_MODAL,
    };

    const expectedState = {
      ...initialState,
      isModalOpen: false,
      selectedEmployeeId: null,
    };

    expect(absenceReducer(initialState, action)).toEqual(expectedState);
  });
});
