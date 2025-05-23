import Navbar from "./Navbar";
import MyVault from './MyVault';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import Addnew from './Addnew';

const Home = () => {
    const { activeComponent, sidebarHam } = useSelector((state) => state.ui);
    const { addopen } = useSelector((state) => state.passwords);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'MyVault':
                return <MyVault />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className={`${sidebarHam === true ? "hidden" : "w-full"} sm:w-[75vw] xl:w-[85vw] flex flex-col transition-all duration-300`}>
                {/* Navbar */}
                <Navbar display={"block"} path={"/logo.png"} />

                {/* Main View */}
                <div
                    className="flex-grow px-4 py-4 overflow-auto bg-gradient-to-br from-gray-900 via-purple-900 to-black backdrop-blur-md"
                    style={{ height: "calc(100vh - 66px)" }}
                >
                    {renderComponent()}
                </div>
            </div>

            {/* Add New Modal */}
            {addopen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 w-[90%] sm:w-[500px] border border-gray-700">
                        <Addnew />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
