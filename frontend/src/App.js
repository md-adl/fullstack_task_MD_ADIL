
import "./App.css";
// import { PlusIcon } from '@heroicons/react/solid'; // For solid icons
// or
// import { PlusIcon } from '@heroicons/react/outline';
import "./index.css";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white-200">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-black font-bold text-center text-4xl mb-4">
            Note App
          </h1>
          <ul></ul>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              type="text"
              placeholder="Enter a new task"
            />
            <button className="flex items-center px-4 py-2 bg-[rgb(146,64,14)] text-white font-semibold rounded-lg hover:bg-[rgb(160,70,15)] focus:outline-none focus:ring-2 focus:ring-[rgb(146,64,14)]">
              {/* <PlusIcon className="w-5 h-5 mr-2" /> */}
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
