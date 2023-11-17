const ShareTable = ({shares}) => {
    const shareOptions = ['Serial No.','Email','Status'];
  
    return (
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr >

              {shareOptions.map((perm) => (
                <th key={perm} scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500  capitalize">
                  {perm}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shares.map((share, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {share.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {share.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900 font-semibold ">
                  {share.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ShareTable;
  