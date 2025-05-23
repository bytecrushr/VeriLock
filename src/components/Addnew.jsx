import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAdd, togglepasswordView, setForm } from '../redux/slice/passwordSlice';
import { addPasswordAsync } from '../redux/thunks/passwordThunk';
import { toast } from 'react-toastify';

const Addnew = () => {
  const dispatch = useDispatch();
  const { passwordView, form } = useSelector((state) => state.passwords);

  const handleChange = (e) => {
    dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
  };

  const save = () => {
    dispatch(addPasswordAsync(form));
    dispatch(setForm({ title: "", site: "", username: "", password: "", note: "" }));
    toast.success("New Password Added");
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-xl shadow-md text-white space-y-3">
      <h2 className="text-lg font-semibold text-purple-400 text-center">Add New Password</h2>

      <div>
        <label className="block text-sm mb-1" htmlFor="title">Website</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-1.5 rounded-lg bg-zinc-600 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="e.g. Facebook"
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="site">URL</label>
        <input
          id="site"
          name="site"
          value={form.site}
          onChange={handleChange}
          className="w-full px-3 py-1.5 rounded-lg bg-zinc-600 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="e.g. https://facebook.com"
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-1.5 rounded-lg bg-zinc-600 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Enter your username"
        />
      </div>

      <div className="relative">
        <label className="block text-sm mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-1.5 rounded-lg bg-zinc-600 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type={passwordView ? "text" : "password"}
          placeholder="Enter your password"
        />
        <span
          onClick={() => dispatch(togglepasswordView(!passwordView))}
          className="absolute right-2 top-[28px] cursor-pointer text-zinc-400 hover:text-purple-400"
        >
          {passwordView ? "🙈" : "👁️"}
        </span>
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-1.5 rounded-lg bg-zinc-600 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Add a short note..."
        />
      </div>

      <div className="flex justify-between pt-2">
        <button
          disabled={!(form.title && form.site && form.username && form.password)}
          onClick={() => { save(); dispatch(toggleAdd(false)); }}
          className="px-4 py-1.5 text-sm bg-purple-300 text-zinc-800 rounded-full hover:bg-purple-400 disabled:bg-zinc-500 transition"
        >
          Save
        </button>
        <button
          onClick={() => {
            dispatch(toggleAdd(false));
            dispatch(setForm({ title: "", site: "", username: "", password: "", note: "" }));
          }}
          className="px-4 py-1.5 text-sm bg-zinc-500 text-white rounded-full hover:bg-zinc-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Addnew;
