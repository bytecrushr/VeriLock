import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveComponent, setSidebarHam } from '../redux/slice/uiSlice';
import { toggleAdd } from '../redux/slice/passwordSlice';

const Sidebar = () => {
    const { addopen } = useSelector((state) => state.passwords);
    const { activeComponent, sidebarHam } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    return (
        <div className={`${sidebarHam === true ? "w-[100vw] flex flex-col " : "hidden"} sm:block sm:w-[25vw] xl:w-[15vw] h-[100vh] p-2 shadow-md sm:flex-col bg-[#1e1e2e]/90 backdrop-blur-md text-white`}>
            <div className='flex items-center justify-between'>
                <button
                    disabled={addopen === true}
                    onClick={() => {
                        dispatch(toggleAdd(true));
                        dispatch(setSidebarHam(false));
                    }}
                    className='mx-3 my-2 py-1 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 w-fit rounded-full flex gap-4 justify-center items-center'
                >
                    <span className='font-bold text-xl'>+</span>
                    <span className='font-bold'>Create New</span>
                </button>

                {sidebarHam && (
                    <button onClick={() => dispatch(setSidebarHam(false))} className='sm:hidden flex text-white gap-2 px-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='font-bold text-xl'>Close</span>
                    </button>
                )}
            </div>

            <button onClick={() => dispatch(setActiveComponent('MyVault'))} className='mx-5 my-2 flex gap-3 group w-fit'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" className={`group-hover:fill-purple-400 transition-colors duration-200 ${activeComponent === "MyVault" ? "fill-purple-400" : "fill-white"}`}>
                    <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"></path>
                </svg>

                <span className={`text-lg group-hover:text-purple-400 transition-colors duration-200 ${activeComponent === "MyVault" ? "text-purple-400" : "text-white"}`}>
                    My Vault
                </span>
            </button>

            <button className='mt-15 flex flex-col items-center gap-5'>
                <span className='text-white/70'>More Features to be added..</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="text-white">
                    <path d="M19 2V5C19 8.86599 15.866 12 12 12M5 2V5C5 8.86599 8.13401 12 12 12M12 12C15.866 12 19 15.134 19 19V22M12 12C8.13401 12 5 15.134 5 19V22" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 2H20M20 22H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
};

export default Sidebar;
