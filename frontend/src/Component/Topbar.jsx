import React, { useEffect, useState } from "react";
import fb from '../assets/fb.jpg'
import axios from 'axios'

function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [first, setFirst] = useState('')
    const toggleDropdown = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/data', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.status === 200) {
                    setName(response.data.username);
                    // setFirst(response.data.username.)
                    setEmail(response.data.email);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="max-w-screen-2xl mx-auto" style={{ position: "relative" }}>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className=" flex flex-wrap items-center justify-between p-4">

                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Space</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            onClick={toggleDropdown}
                            aria-expanded={isOpen ? "true" : "false"}
                        >
                            <span className="sr-only">Open user menu</span>
                            <div className="relative">
                                <div className="w-11 h-11 border-2 rounded-full">
                                    <h1 className="text-xl font-bold mt-1">{name && name.charAt(0)}</h1>
                                </div>
                                {name && (
                                    <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                )}
                            </div>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isOpen ? "true" : "false"}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            {isOpen && (
                <div className="fixed 2xl:mr-44 top-16 right-4 mt-3 z-50">
                    <div className="text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</a>
                            </li>
                            <li>
                                {name ?
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => {
                                        localStorage.removeItem("token");
                                    }}>Sign Out</a>
                                    : <a href="signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign up</a>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Topbar;
