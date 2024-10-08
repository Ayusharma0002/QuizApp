//ye bilkul sahi hai
// import React, { useState, useEffect } from 'react';
// import PageTitle from '../../../components/PageTitle';
// import { Table, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { getReports } from '../../../apicalls/reports'; // Assuming API to get all user quiz attempts

// function AdminReportsPage() {
//   const [reportsData, setReportsData] = useState([]);
//   const [filters, setFilters] = useState({
//     quizTitle: "",
//     userName: "",
//   });
//   const dispatch = useDispatch();

//   // Update the columns to reflect the new structure
//   const columns = [
//     {
//       title: "S.No", // Serial Number Column
//       dataIndex: "serialNumber",
//       render: (text, record, index) => index + 1, // Auto-increment index for serial number
//     },
//     {
//       title: "Username",
//       dataIndex: "userName",
//       render: (text, record) => <>{record.userName}</>,
//     },
//     {
//       title: "Email",
//       dataIndex: "userEmail",
//       render: (text, record) => <>{record.userEmail}</>,
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "userPhone",
//       render: (text, record) => <>{record.userPhone || "N/A"}</>, // Show N/A if no phone number
//     },
//     {
//       title: "Quiz Title",
//       dataIndex: "quizTitle",
//       render: (text, record) => <>{record.quizTitle}</>,
//     },
//     {
//       title: "Technical Score",
//       dataIndex: "technicalScore",
//       render: (text, record) => <>{record.report["Technical Skills"] || 0}</>, // Update to access scores correctly
//     },
//     {
//       title: "Conceptual Score",
//       dataIndex: "conceptualScore",
//       render: (text, record) => <>{record.report["Conceptual Skills"] || 0}</>, // Update to access scores correctly
//     },
//     {
//       title: "Human Score",
//       dataIndex: "humanScore",
//       render: (text, record) => <>{record.report["Human Skills"] || 0}</>, // Update to access scores correctly
//     },
//   ];

//   // Update the getData function to fetch new report structure
//   const getData = async (tempFilters) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getReports(tempFilters);
//       dispatch(HideLoading());
//       if (response.success) {
//         setReportsData(response.data);
//         message.success("Data fetched successfully!"); // Use a static message
//         console.log(response.data); // Log the fetched data
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData(filters);
//   }, []); // Empty dependency array to run once on mount

//   return (
//     <div>
//       <PageTitle title="Reports" />
//       <div className='divider'></div>
//       <div className='flex gap-2 mt-2'>
//         <input
//           type="text"
//           placeholder="Quiz Title"
//           value={filters.quizTitle}
//           onChange={(e) => setFilters({ ...filters, quizTitle: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="User"
//           value={filters.userName}
//           onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
//         />
//         <button
//           className='primary-outlined-btn'
//           onClick={() => {
//             setFilters({
//               userName: "",
//               quizTitle: "",
//             });
//             getData({
//               userName: "",
//               quizTitle: "",
//             });
//           }}
//         >
//           Clear
//         </button>
//         <button
//           className='primary-contained-btn'
//           onClick={() => getData(filters)}
//         >
//           Search
//         </button>
//       </div>
//       <Table columns={columns} className="mt-2" dataSource={reportsData} pagination={{ pageSize: 10 }} />
//     </div>
//   );
// }

// export default AdminReportsPage;


// import React, { useState, useEffect } from 'react';
// import PageTitle from '../../../components/PageTitle';
// import { Table, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { getReports } from '../../../apicalls/reports'; // Assuming API to get all user quiz attempts
// import { DownloadOutlined } from '@ant-design/icons'; // Import the download icon

// function AdminReportsPage() {
//   const [reportsData, setReportsData] = useState([]);
//   const [filters, setFilters] = useState({
//     quizTitle: "",
//     userName: "",
//   });
//   const dispatch = useDispatch();

//   // Update the columns to include the download report column
//   const columns = [
//     {
//       title: "S.No", // Serial Number Column
//       dataIndex: "serialNumber",
//       render: (text, record, index) => index + 1, // Auto-increment index for serial number
//     },
//     {
//       title: "Username",
//       dataIndex: "userName",
//       render: (text, record) => <>{record.userName}</>,
//     },
//     {
//       title: "Email",
//       dataIndex: "userEmail",
//       render: (text, record) => <>{record.userEmail}</>,
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "userPhone",
//       render: (text, record) => <>{record.userPhone || "N/A"}</>, // Show N/A if no phone number
//     },
//     {
//       title: "Quiz Title",
//       dataIndex: "quizTitle",
//       render: (text, record) => <>{record.quizTitle}</>,
//     },
//     {
//       title: "Technical Score",
//       dataIndex: "technicalScore",
//       render: (text, record) => <>{record.report["Technical Skills"] || 0}</>,
//     },
//     {
//       title: "Conceptual Score",
//       dataIndex: "conceptualScore",
//       render: (text, record) => <>{record.report["Conceptual Skills"] || 0}</>,
//     },
//     {
//       title: "Human Score",
//       dataIndex: "humanScore",
//       render: (text, record) => <>{record.report["Human Skills"] || 0}</>,
//     },
//     {
//       title: "Download Report",
//       dataIndex: "downloadReport",
//       render: (text, record) => (
//         <button
//           onClick={() => downloadReport()}
//           style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1890ff' }}
//         >
//           <DownloadOutlined />
//         </button>
//       ),
//     },
//   ];

//   // Function to handle report download
//   const downloadReport = () => {
//     // URL for the report file located in the public folder
//     const url = '/report.pdf'; // Directly referencing the file
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'reports.pdf'; // Specify the file name
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     message.success("Report downloaded successfully!");
//   };

//   // Update the getData function to fetch new report structure
//   const getData = async (tempFilters) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getReports(tempFilters);
//       dispatch(HideLoading());
//       if (response.success) {
//         setReportsData(response.data);
//         message.success("Data fetched successfully!");
//         console.log(response.data);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData(filters);
//   }, []); // Empty dependency array to run once on mount

//   return (
//     <div>
//       <PageTitle title="Reports" />
//       <div className='divider'></div>
//       <div className='flex gap-2 mt-2'>
//         <input
//           type="text"
//           placeholder="Quiz Title"
//           value={filters.quizTitle}
//           onChange={(e) => setFilters({ ...filters, quizTitle: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="User"
//           value={filters.userName}
//           onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
//         />
//         <button
//           className='primary-outlined-btn'
//           onClick={() => {
//             setFilters({
//               userName: "",
//               quizTitle: "",
//             });
//             getData({
//               userName: "",
//               quizTitle: "",
//             });
//           }}
//         >
//           Clear
//         </button>
//         <button
//           className='primary-contained-btn'
//           onClick={() => getData(filters)}
//         >
//           Search
//         </button>
//       </div>
//       <Table columns={columns} className="mt-2" dataSource={reportsData} pagination={{ pageSize: 10 }} />
//     </div>
//   );
// }

// export default AdminReportsPage;





import React, { useState, useEffect } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Table, message } from 'antd';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { getReports } from '../../../apicalls/reports'; // Assuming API to get all user quiz attempts

function AdminReportsPage() {
  const [reportsData, setReportsData] = useState([]);
  const [filters, setFilters] = useState({
    quizTitle: "",
    userName: "",
  });
  const dispatch = useDispatch();

  // Update the columns to include the download report column
  const columns = [
    {
      title: "S.No", // Serial Number Column
      dataIndex: "serialNumber",
      render: (text, record, index) => index + 1, // Auto-increment index for serial number
    },
    {
      title: "Username",
      dataIndex: "userName",
      render: (text, record) => <>{record.userName}</>,
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      render: (text, record) => <>{record.userEmail}</>,
    },
    {
      title: "Phone Number",
      dataIndex: "userPhone",
      render: (text, record) => <>{record.userPhone || "N/A"}</>, // Show N/A if no phone number
    },
    {
      title: "Quiz Title",
      dataIndex: "quizTitle",
      render: (text, record) => <>{record.quizTitle}</>,
    },
    {
      title: "Technical Score",
      dataIndex: "technicalScore",
      render: (text, record) => <>{record.report["Technical Skills"] || 0}</>,
    },
    {
      title: "Conceptual Score",
      dataIndex: "conceptualScore",
      render: (text, record) => <>{record.report["Conceptual Skills"] || 0}</>,
    },
    {
      title: "Human Score",
      dataIndex: "humanScore",
      render: (text, record) => <>{record.report["Human Skills"] || 0}</>,
    },
    {
      title: "Download Report",
      dataIndex: "downloadReport",
      render: (text, record) => (
        <button
          onClick={() => downloadReport()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1890ff', display: 'flex', alignItems: 'center' }}
        >
          <span className="material-icons" style={{ fontSize: '20px', marginRight: '4px' }}>file_download</span>
          Download
        </button>
      ),
    },
  ];

  // Function to handle report download
  const downloadReport = () => {
    // URL for the report file located in the public folder
    const url = '/reports.pdf'; // Directly referencing the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports.pdf'; // Specify the file name
    document.body.appendChild(a);
    a.click();
    a.remove();
    message.success("Report downloaded successfully!");
  };

  // Update the getData function to fetch new report structure
  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getReports(tempFilters);
      dispatch(HideLoading());
      if (response.success) {
        setReportsData(response.data);
        message.success("Data fetched successfully!");
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <PageTitle title="Reports" />
      <div className='divider'></div>
      <div className='flex gap-2 mt-2'>
        <input
          type="text"
          placeholder="Quiz Title"
          value={filters.quizTitle}
          onChange={(e) => setFilters({ ...filters, quizTitle: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          className='primary-outlined-btn'
          onClick={() => {
            setFilters({
              userName: "",
              quizTitle: "",
            });
            getData({
              userName: "",
              quizTitle: "",
            });
          }}
        >
          Clear
        </button>
        <button
          className='primary-contained-btn'
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table columns={columns} className="mt-2" dataSource={reportsData} pagination={{ pageSize: 10 }} />
    </div>
  );
}

export default AdminReportsPage;
