import React from 'react';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { Action } from '../../types/Action';

interface ExportToExcelProps {
  data: Action[];
}

const ActionsExportToExcel: React.FC<ExportToExcelProps> = ({ data }: ExportToExcelProps) => {
  const columnNames = ['One line summary of your action', 'Few line summary of how you will take this action'];

  const actionsToExport = data.map(({ title, description }) => ({
    [columnNames[0]]: title,
    [columnNames[1]]: description,
  }));


  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(actionsToExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Actions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const saveAsExcel = (buffer: any, fileName: string) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    saveAsExcel(excelBuffer, 'actions.xlsx');
  };

  return (
    <div>
      {(data && data.length > 0)
      &&
        <Button variant="success" onClick={exportToExcel}>
          Export Actions to Excel
        </Button>
      }
    </div>
  );
};

export default ActionsExportToExcel;
