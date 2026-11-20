// import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
// import React from "react";

// const DashboardPage = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="grid grid-cols-12">
//       <div className="col-span-3">
//         <DashboardSidebar />
//       </div>
//       <div className="col-span-9">{children}</div>
//     </div>
//   );
// };

// export default DashboardPage;

import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import React from "react";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="grid min-h-screen grid-cols-12">
        {/* Sidebar */}
        <div className="col-span-3 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-9 min-w-0 p-5 sm:p-6 lg:p-8">
          <div className="min-h-[calc(100vh-4rem)] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
