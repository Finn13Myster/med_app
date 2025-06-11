import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const reports = [
    { id: 1, doctor: "Dr. Jiao Yang", specialty: "Dentist", filename: "patient_report.pdf" },
    { id: 2, doctor: "Dr. Jane Smith", specialty: "Dermatology", filename: "patient_report.pdf" }
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctor}</td>
              <td>{report.specialty}</td>
              <td>
                <a href={`/${report.filename}`} target="_blank" rel="noopener noreferrer">
                  <button className="btn-view">View Report <i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>
                </a>
              </td>
              <td>
                <a href={`/${report.filename}`} download>
                  <button className="btn-download">Download Report <i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
