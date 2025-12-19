import React from "react";

const BusTable = ({ buses, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tên xe
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Biển số
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Số ghế
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {bus.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                {bus.bus_name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-blue-600">
                {bus.license_plate}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {bus.total_seats}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
                <button
                  onClick={() => onEdit(bus)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(bus.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusTable;
