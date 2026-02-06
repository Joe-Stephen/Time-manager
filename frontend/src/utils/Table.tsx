import React from "react";
// Removed unused MUI imports

type TableRowData = {
  [key: string]: string | number | boolean;
};

interface MaterialTableProps {
  data: TableRowData[];
}

const MaterialTable: React.FC<MaterialTableProps> = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="text-center py-8 text-slate-500 italic">
        No logs recorded yet today.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs tracking-wider font-medium">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 border-b border-slate-700/50 first:rounded-tl-lg last:rounded-tr-lg"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50 text-slate-300">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-slate-700/30 transition-colors duration-150 group"
            >
              {Object.values(row).map((value, idx) => (
                <td
                  key={idx}
                  className="px-6 py-4 font-mono group-last:first:rounded-bl-lg group-last:last:rounded-br-lg"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
