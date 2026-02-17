export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between p-6">

        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-8">
            Hire-a-Helper
          </h2>

          <nav className="space-y-5 text-gray-600">

            <div className="flex items-center justify-between bg-blue-50 text-blue-600 px-3 py-2 rounded-lg">
              <span>Feed</span>
            </div>

            <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
              <span>My Tasks</span>
            </div>

            <div className="flex items-center justify-between hover:text-blue-500 cursor-pointer">
              <span>Requests</span>
              {/* <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                
              </span> */}
            </div>

            <div className="hover:text-blue-500 cursor-pointer">
              My Requests
            </div>

            <div className="hover:text-blue-500 cursor-pointer">
              + Add Task
            </div>

            <div className="hover:text-blue-500 cursor-pointer">
              Settings
            </div>

          </nav>
        </div>

        {/* User Profile
        <div className="flex items-center gap-3 border-t pt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-sm font-medium"></p>
            <p className="text-xs text-gray-500"></p>
          </div>
        </div> */}

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-2xl font-bold mb-2">
          Feed
        </h1>

        <p className="text-gray-500 mb-8">
          Find tasks that need help
        </p>

        {/* Empty Design Area */}
        <div className="bg-white h-96 rounded-xl shadow flex items-center justify-center text-gray-400">
          Task feed will appear here
        </div>

      </div>
    </div>
  );
}
