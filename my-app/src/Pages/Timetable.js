import React, { useState } from 'react';

const Timetable = () => {
  const initialTableData = [
    ['Period', '8:00', '9:00', '10:00'],
    ['Monday', '', '', ''],
    ['Tuesday', '', '', ''],
    ['Wednesday', '', '', ''],
    ['Thursday', '', '', ''],
    ['Friday', '', '', ''],
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [isEditMenuVisible, setEditMenuVisible] = useState(false);

  const handleCellValueChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const addColumn = () => {
    setTableData(tableData.map(row => [...row, '']));
  };

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill('')]);
  };

  const deleteColumn = (colIndex) => {
    setTableData(tableData.map(row => row.filter((_, index) => index !== colIndex)));
  };

  const deleteRow = (rowIndex) => {
    setTableData(tableData.filter((_, index) => index !== rowIndex));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Timetable</h1>
      
      <table style={tableStyle}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={cellStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button style={buttonStyle} onClick={() => setEditMenuVisible(true)}>Edit Table</button>
      </div>

      {isEditMenuVisible && (
        <div className="edit-menu" style={menuStyle}>
          <div style={{ textAlign: 'right' }}>
            <button style={closeButtonStyle} onClick={() => setEditMenuVisible(false)}>X</button>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button style={buttonStyle} onClick={addColumn}>Add Column</button>
            <button style={buttonStyle} onClick={addRow}>Add Row</button>
          </div>
          <table style={tableStyle}>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={cellStyle}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                  ))}
                  {rowIndex > 0 && (
                    <td>
                      <button style={deleteButtonStyle} onClick={() => deleteRow(rowIndex)}>Delete Row</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center' }}>
            {tableData[0].map((_, colIndex) => colIndex > 0 && (
              <button key={colIndex} style={deleteButtonStyle} onClick={() => deleteColumn(colIndex)}>
                Delete Column {colIndex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const tableStyle = {
  backgroundColor: 'white',
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  border: 'none',
  backgroundColor: 'inherit',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#DC3545',
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6C757D',
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '10px 15px',
};

const menuStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  zIndex: 1000,
};

export default Timetable;
