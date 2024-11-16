import React from "react";
import { useSelector } from "react-redux";

const DownloadCSV = () => {
  const expenses = useSelector((state) => state.expenses.expensesList);

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Amount,Reason,Date\n" +
      expenses
        .map((exp) => `${exp.name},${exp.amount},${exp.reason},${exp.date}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={downloadCSV}>Download Expenses CSV</button>;
};

export default DownloadCSV;
