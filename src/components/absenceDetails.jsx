import React, { useEffect } from "react";
import { fetchConflicts, closeModal } from "../redux/actions/absenceActions";

const AbsenceDetails = ({ isModalOpen, employeeId, dispatch, conflicts }) => {
  useEffect(() => {
    if (isModalOpen) {
      fetchConflicts(employeeId, dispatch);
    }
  }, [conflicts, dispatch, isModalOpen]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => handleCloseModal()}>
          &times;
        </span>
        <h2>Employee Absence Details</h2>
        {conflicts === undefined ? (
          <div>Loading conflicts...</div>
        ) : (
          <div>
            <p className="text-red-500">
              {" "}
              Conflict Status: <strong> {conflicts ? `Yes` : `No`}</strong>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbsenceDetails;
