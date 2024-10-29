import { fetchAbsenceData, fetchConflicts } from "./absenceActions";
import * as Constant from "./actionTypes";
import axios from "axios";

jest.mock("axios");

describe("fetchAbsenceData", () => {
  const mockDispatch = jest.fn();
  const calculateEndDate = jest.fn();
  const formatDate = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("dispatches FETCH_ABSENCES_SUCCESS on successful API call", async () => {
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

    const transformedData = [
      {
        ...mockAbsences[0],
        fullName: "Rahaf Deckard",
        endDate: "2022-06-09",
        startDate: "2022-05-28",
      },
    ];
    axios.get.mockResolvedValue({ data: mockAbsences });

    calculateEndDate.mockReturnValue("2022-06-09");
    formatDate.mockReturnValue("2022-05-28");

    await fetchAbsenceData(mockDispatch);
    expect(axios.get).toHaveBeenCalledWith(
      process.env.REACT_APP_API_URL + "absences"
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Constant.FETCH_ABSENCES_SUCCESS,
      payload: transformedData,
    });
  });

  it("dispatches FETCH_ABSENCES_FAILURE on fetch failure", async () => {
    const errorMessage = "Failed to fetch absences";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await fetchAbsenceData(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Constant.FETCH_ABSENCES_FAILURE,
      payload: errorMessage,
    });
  });

  it("dispatches FETCH_ABSENCES_FAILURE when response is not an array", async () => {
    const invalidData = { message: "This is not an array" };
    axios.get.mockResolvedValue({ data: invalidData });

    await fetchAbsenceData(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Constant.FETCH_ABSENCES_FAILURE,
      payload: "Response is not an array",
    });
  });
});

describe("fetchConflicts", () => {
  const mockDispatch = jest.fn();
  const employeeId = "12345";

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("dispatches CHECK_CONFLICT_SUCCESS on successful fetch", async () => {
    const mockConflictResponse = { conflicts: false };
    axios.get.mockResolvedValue({ data: mockConflictResponse });

    await fetchConflicts(employeeId, mockDispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}conflict/${employeeId}`
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Constant.CHECK_CONFLICT_SUCCESS,
      payload: mockConflictResponse.conflicts,
    });
  });

  it("dispatches CHECK_CONFLICT_FAILURE on failed fetch", async () => {
    const errorMessage = "Failed to check conflict";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await fetchConflicts(employeeId, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Constant.CHECK_CONFLICT_FAILURE,
      payload: errorMessage,
    });
  });
});
