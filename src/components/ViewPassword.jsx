import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { setForm, togglepasswordView } from '../redux/slice/passwordSlice'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import { deletePasswordAsync, updatePasswordAsync } from '../redux/thunks/passwordThunk'
import axios from 'axios'

const ViewPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { uid } = useParams()
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState(null)
    const { form, passwordView } = useSelector((state) => state.passwords)

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:3001/passwords')
                const current = response.data.find((item) => item._id === uid)
                setSelected(current || null)
            } catch (error) {
                console.error('Error fetching passwords:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPasswords()
    }, [uid, edit])

    const handleEdit = () => {
        setEdit(true)
        dispatch(setForm(selected))
    }

    const handleChange = (e) => {
        dispatch(setForm({ ...form, [e.target.id]: e.target.value }))
    }

    const handleUpdate = () => {
        dispatch(updatePasswordAsync({ id: selected._id, updatedData: form }))
        setEdit(false)
        toast('Password Updated')
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to Clipboard')
    }

    const deletePass = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password?")
        if (confirmDelete) {
            dispatch(deletePasswordAsync(id))
            navigate('/')
            toast('Password Deleted')
        }
    }

    const isValid = form.title.trim() && form.site.trim() && form.username.trim() && form.password.trim()

    return (
        <>
            <Navbar display="hidden" path="/logo.png" />
            <div className="min-h-[calc(100vh-66px)] bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-10">
                {loading || !selected ? (
                    <div className="text-white text-xl">Loading...</div>
                ) : (
                    <div className="bg-gray-900 text-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative border border-purple-700">
                        {!edit && (
                            <Link
                                to="/"
                                onClick={() => dispatch(togglepasswordView(false))}
                                className="absolute top-4 left-4 text-white hover:text-purple-300 text-sm sm:text-base"
                            >
                                ← Back
                            </Link>
                        )}

                        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
                            {edit ? 'Edit Password' : 'Password Details'}
                        </h2>

                        {edit ? (
                            <>
                                {['title', 'site', 'username', 'password'].map((field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block text-sm font-semibold text-white capitalize mb-1" htmlFor={field}>
                                            {field}
                                        </label>
                                        <input
                                            id={field}
                                            type="text"
                                            value={form[field] || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-black text-white border border-purple-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                                            placeholder={`Enter ${field}`}
                                        />
                                        {form[field]?.trim() === "" && <p className="text-red-400 text-xs mt-1">*Required</p>}
                                    </div>
                                ))}

                                <div className="mb-4">
                                    <label htmlFor="note" className="block text-sm font-semibold text-white">Note</label>
                                    <input
                                        id="note"
                                        type="text"
                                        value={form.note || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-black text-white border border-purple-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Optional..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                                    <button
                                        onClick={handleUpdate}
                                        disabled={!isValid}
                                        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 disabled:bg-gray-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(setForm({ title: "", site: "", username: "", password: "", note: "" }))
                                            setEdit(false)
                                        }}
                                        className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4 text-sm sm:text-base">
                                <div className="border-b border-purple-800 pb-2">
                                    <p className="font-semibold text-white">Website</p>
                                    <p>{selected.title}</p>
                                </div>
                                <div className="border-b border-purple-800 pb-2">
                                    <p className="font-semibold text-white">Address</p>
                                    <a href={`https://${selected.site}`} className="text-blue-400 underline break-all" target="_blank" rel="noreferrer">
                                        {selected.site}
                                    </a>
                                </div>
                                <div className="border-b border-purple-800 pb-2 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-white">Username</p>
                                        <p className="break-words">{selected.username}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(selected.username)}
                                        className="text-blue-400 text-sm hover:underline"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="border-b border-purple-800 pb-2 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-white">Password</p>
                                        <p>{passwordView ? selected.password : "•".repeat(selected.password.length)}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => dispatch(togglepasswordView(!passwordView))}
                                            className="text-blue-400 text-sm hover:underline"
                                        >
                                            {passwordView ? "Hide" : "Show"}
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(selected.password)}
                                            className="text-blue-400 text-sm hover:underline"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Note</p>
                                    <p className="break-words">{selected.note || "—"}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                                    <button
                                        className="bg-purple-300 text-black px-6 py-2 rounded-full hover:bg-purple-400"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500"
                                        onClick={() => deletePass(selected._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewPassword
