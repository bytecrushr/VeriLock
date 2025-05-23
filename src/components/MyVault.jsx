import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleAdd } from '../redux/slice/passwordSlice';
import { useNavigate } from 'react-router-dom'
import FaviconScrap from './utility/FaviconScrap';
import { fetchPasswords} from '../redux/thunks/passwordThunk'
const MyVault = () => {
    const { storedPassword } = useSelector((state) => state.passwords);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
            dispatch(fetchPasswords())
          }, [dispatch])
    return (
        <>
        <div className=" py-2 px-5 shadow-md border border-gray-900 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="lock" width="32" height="32" x="0" y="0" version="1.1" viewBox="0 0 512 512"
                            className={`fill-black `}>
                            <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"></path>
                        </svg>
                        <h2 className=" text-lg font-medium">My Vault</h2>
                    </div>
        <div className='flex flex-wrap justify-center md:justify-normal sm:max-w-[85vw] max-h-[90vh] overflow-y-auto p-5 gap-5' >
            {storedPassword.map((item, index) => (
                <div onClick={() => { navigate(`/view/${item._id}`); dispatch(toggleAdd(false)) }}
                className='border border-gray-900 shadow-md p-6 min-w-60 max-w-75 h-40 justify-around flex flex-col items-center cursor-pointer hover:bg-purple-900 transition-all duration-200' key={index}>
                    <FaviconScrap site={item.site}/>
                    <span className="font-medium">
                        {item.title}
                    </span>
                    <span className=''>{item.username}</span>
                </div>
            ))}
        </div>
        </>
    )
}

export default MyVault