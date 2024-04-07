import { useState } from 'react';
import axios from 'axios';

function AddFolder() {

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handle = async () => {
        try {
            const response = await axios.post('http://localhost:3000/addfolder', {
                foldername: name,
                wallpaper: link
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.status === 201) {
                window.location.href = '/';
            }
            else {
                alert("something went wrong")
            }
        } catch (error) {
            console.error('Error adding folder:', error);
        }
    }

    return (
        <div className=" mb-[350px] mt-32 flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className=" flex justify-center text-xl font-medium text-gray-900 dark:text-white">Craft a Folder</h5>
                <div className='mt-5'>
                    <input onChange={(e) => {
                        setName(e.target.value)
                    }} placeholder='Folder Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                </div >
                <div className='mt-5'>
                    <input onChange={(e) => {
                        setLink(e.target.value)
                    }} placeholder='wallpaper' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                </div>
                <div className='mt-5'>
                <button onClick={handle} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    </div>

                <div className='flex justify-center text-xl'>
                    To convert .png to url...
                    <a className='hover:underline hover:text-red-500' href="https://i-converter.com/files/jpg-to-url">(LINK)</a>

                </div>
                <div className='flex justify-center text-xl'>
                    To convert .jpg to .png...
                    <a href="https://jpg2png.com/" className='hover:underline hover:text-red-500'>(LINK)</a>
                </div>
            </div>
        </div>
    );
}
export default AddFolder