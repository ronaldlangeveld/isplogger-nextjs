import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
var moment = require("moment");

const ResultsTable = ({ units, data }) => {
  const [tbData, setTbData] = useState(data || null);

  useEffect(() => {
    setTbData(data);
  }, [data]);

  return (
    <>
      {tbData !== null ? (
        <table className="table is-fullwidth has-text-centered mt-4">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Download</th>
              <th>Upload</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            {tbData.map((item, index) => (
              <tr key={index}>
                <td>{moment(item.created_at).format("lll")}</td>
                <td>
                  {parseFloat(item.download / units.conversion).toFixed(2)}{" "}
                  <strong>{units.unit}</strong>
                </td>
                <td>
                  {parseFloat(item.upload / units.conversion).toFixed(2)}{" "}
                  <strong>{units.unit}</strong>
                </td>
                <td>
                  {parseFloat(item.ping).toFixed(2)} <strong>ms</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
};

export default ResultsTable;
