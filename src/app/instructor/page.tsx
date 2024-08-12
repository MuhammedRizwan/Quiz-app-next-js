import React from 'react'
import Link from 'next/link'

export default function instructorPage() {
    return (
        <div className=" bg-white rounded-lg p-6 shadow-lg h-3/4 m-10 " >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User List</h2>
        </div>
        <table className="min-w-full bg-gray-100">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Profile</th>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Name</th>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Email</th>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Phone</th>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Update</th>
              <th className="py-2 px-4 border-b border-gray-600 text-violet-500">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-center border-b border-gray-600">Profile Data</td>
              <td className="py-2 px-4 text-center border-b border-gray-600">Name Data</td>
              <td className="py-2 px-4 text-center border-b border-gray-600">Email Data</td>
              <td className="py-2 px-4 text-center border-b border-gray-600">Phone Data</td>
              <td className="py-2 px-4 text-center border-b border-gray-600">Update Button</td>
              <td className="py-2 px-4 text-center border-b border-gray-600">Delete Button</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      
   );
}