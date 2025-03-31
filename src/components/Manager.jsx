import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ id: "", site: "", email: "", pass: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordIcon, setPasswordIcon] = useState('icons/eye-open.png')

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
        setPasswordIcon(passwordVisible ? 'icons/eye-open.png' : 'icons/eye-closed.png')
    }

    const handleAdd = async () => {
        if (form.email.length === 0 || form.pass.length === 0 || form.site.length === 0) {
            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: form.id }) })

        let newPassword = { ...form, id: uuidv4() };
        setPasswordArray([...passwordArray, newPassword])

        await fetch("http://localhost:3000/", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: uuidv4() }) })

        setForm({ id: "", site: "", email: "", pass: "" })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyToClipboard = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const handleDelete = async (id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        let res = await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    }

    const handleEdit = (id) => {
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="bg-[#000000] py-20 flex flex-col justify-center items-center">
                <div className='flex justify-between items-center gap-4'>
                    <div className="head flex flex-col items-center">
                        <h1 className="text-5xl font-mono text-white">Secure</h1>
                        <h1 className='text-[21px] text-green-500 font-mono'>Your Password</h1>
                    </div>
                    <div className="logo"><img width='70' src="icons/logo2.png" alt="" /></div>
                </div>
                <div className="inputs w-2xl text-white font-mono flex flex-col gap-5">
                    <div className="url">
                        <label htmlFor="site">Link :</label>
                        <input onChange={handleChange} type="text" value={form.site} name='site' placeholder='Enter Website URL' className='w-[100%] bg-[#3c3c3c] rounded-[5px] mt-1 px-2 py-1' />
                    </div>
                    <div className="email_pass justify-between items-center flex gap-5">
                        <div className="flex items-center gap-5">
                            <label htmlFor="email">MailId :</label>
                            <input onChange={handleChange} value={form.email} type="email" name='email' placeholder='Enter Email' className="bg-[#3c3c3c] rounded-[5px] px-2 py-1" />
                        </div>
                        <div className="flex items-center gap-5">
                            <label htmlFor="pass">Password :</label>
                            <div className="relative">
                                <input onChange={handleChange}
                                    value={form.pass}
                                    type={passwordVisible ? 'text' : 'password'}
                                    name='pass'
                                    placeholder='Enter Password'
                                    className="bg-[#3c3c3c] rounded-[5px] px-2 py-1"  // Added padding-right to make space for the icon
                                />
                                <span
                                    onClick={togglePassword}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                >
                                    <img src={passwordIcon} alt="Toggle Password Visibility" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleAdd} className="addBtn flex justify-center items-center bg-green-500 text-black font-bold text-xl rounded-[5px] cursor-pointer hover:bg-green-600 transition-all duration-300">
                        <button className='cursor-pointer flex justify-center items-center gap-2 py-1'>
                            <lord-icon
                                style={{ width: "22px", height: "22px" }}
                                className=""
                                src="https://cdn.lordicon.com/hqymfzvj.json"
                                trigger="hover">
                            </lord-icon>
                            <div>Add</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="font-mono text-white w-[70%] mx-auto rounded-lg shadow-xl bg-[#181818] overflow-hidden mb-10 px-2">
                <div className="mac-header gap-4 flex justify-between items-center bg-[#181818] px-4 py-5">
                    <div className='text-2xl font-bold'>
                        YOUR PASSWORDS
                    </div>
                    <div className="mac-buttons flex space-x-2">
                        <div className="mac-button w-3 h-3 rounded-full bg-red-600 hover:bg-red-700 cursor-pointer"></div>
                        <div className="mac-button w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
                        <div className="mac-button w-3 h-3 rounded-full bg-green-600 hover:bg-green-700 cursor-pointer"></div>
                    </div>
                </div>

                <div className="content px-20 text-white">
                    {passwordArray.length === 0 && <div className="text-center text-xl mb-5">No Passwords Added</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto mb-5 w-full text-left">
                            <thead>
                                <tr>
                                    <th className='text-xl text-green-500 pb-2'>Site URL</th>
                                    <th className='text-xl text-green-500 pb-2'>MailId</th>
                                    <th className='text-xl text-green-500 pb-2'>Password</th>
                                    <th className='text-xl text-green-500 pb-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='py-2'>
                                                <div className="flex items-center gap-3">
                                                    <a href={item.site} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.site}</a>
                                                    <img
                                                        src="icons/copy.png"
                                                        alt="Copy URL"
                                                        className="cursor-pointer"
                                                        onClick={() => copyToClipboard(item.site)}
                                                    />
                                                </div>
                                            </td>
                                            <td className='py-2'>
                                                <div className="flex items-center gap-3">
                                                    <div>{item.email}</div>
                                                    <img
                                                        src="icons/copy.png"
                                                        alt="Copy Email"
                                                        className="cursor-pointer"
                                                        onClick={() => copyToClipboard(item.email)}
                                                    />
                                                </div>
                                            </td>
                                            <td className='py-2'>
                                                <div className="flex items-center gap-3">
                                                    <div>{"*".repeat(8)}</div>
                                                    <img
                                                        src="icons/copy.png"
                                                        alt="Copy Password"
                                                        className="cursor-pointer"
                                                        onClick={() => copyToClipboard(item.pass)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="buttons flex gap-3">
                                                    <button onClick={() => handleDelete(item.id)} className='text-black bg-green-500 hover:bg-red-500 transition-all duration-300 cursor-pointer p-1 px-3 rounded-lg'><img src="icons/delete.png" alt="" /></button>
                                                    <button onClick={() => handleEdit(item.id)} className='text-black bg-green-500 hover:bg-green-800 transition-all duration-300 cursor-pointer p-1 px-3 rounded-lg'><img src="icons/edit.png" alt="" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
