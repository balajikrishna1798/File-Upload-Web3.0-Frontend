const RolesTable = ({ roles }) => {
    // Define the permissions we'll display
    const permissions = ['Access', 'Create', 'Edit', 'View', 'Delete'];
  
    return (
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              {permissions.map((perm) => (
                <th key={perm} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {perm}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {role.title}
                </td>
                {permissions.map((perm) => (
                  <td key={perm} className="px-6 py-4 text-sm text-gray-500">
                    <input 
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded" 
                      checked={role.permissions.includes(perm)}
                      disabled
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RolesTable;
  