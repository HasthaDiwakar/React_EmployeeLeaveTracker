const initialState = {
  absences: [],
  filteredAbsences: [],
  loading: true,
  error: null,
  conflicts: undefined,
  sortKey: "startDate",
  sortDirection: "ascending",
  isModalOpen: false,
  selectedEmployeeId: null,
};

export default initialState;
