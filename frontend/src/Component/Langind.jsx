import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"

function ContextMenu({ xPos, yPos, onDelete }) {
    return (
        <div
            className="fixed z-10 bg-white border border-gray-200 shadow-md rounded py-2 px-4"
            style={{ top: yPos, left: xPos }}
        >
            <button onClick={onDelete} className="block w-full text-left py-1 px-2 text-sm text-red-500 hover:bg-gray-100">
                Delete
            </button>
        </div>
    );
}

function Landing() {
    const [folder, setFolder] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://space-backend-two.vercel.app/get_all_folder', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.status === 201) {
                    setFolder(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleContextMenu = (e, folderId) => {
        e.preventDefault();
        setContextMenu({ xPos: e.clientX, yPos: e.clientY, folderId });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleDeleteFolder = async (folderId) => {
        try {
            await axios.put('https://space-backend-two.vercel.app/deletefolder', { folderid: folderId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            // Fetch folder data again after deletion
            const response = await axios.get('https://space-backend-two.vercel.app/get_all_folder', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.status === 201) {
                setFolder(response.data.data);
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
        setContextMenu(null); // Close context menu after deletion
    };

    return (
        <div className='mb-24'>
            {folder.length !== 0 ? (
                <div>
                    <h1 className='text-7xl ml-12 mt-14 font-medium mb-28'>._This is Your Space</h1>
                    <div className='flex flex-wrap mx-20' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        {folder.map(item => (
                            <motion.div
                                key={item._id}
                                className="py-10 px-5 p-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 500, damping: 10 }}
                                onContextMenu={(e) => handleContextMenu(e, item._id)} // Right-click handler
                            >
                                <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0">
                                    <a href={`/folder/${item._id}`}>
                                        <img className="object-cover w-full h-60 rounded-lg" src={item.wallpaper} alt="img" />
                                    </a>
                                    <figcaption className="absolute font-mono text-lg text-red-500 bottom-0.5">
                                        <p className='text-xl '>{item.foldername}</p>
                                        <p className="text-sm text-red-200">{new Date(item.madeat).toLocaleDateString()}</p>
                                    </figcaption>
                                </figure>
                            </motion.div>
                        ))}
                    </div>
                    {contextMenu && (
                        <ContextMenu
                            xPos={contextMenu.xPos}
                            yPos={contextMenu.yPos}
                            onDelete={() => handleDeleteFolder(contextMenu.folderId)}
                        />
                    )}
                    <div className='mt-20 flex justify-center' onClick={() => {
                        window.location.href = '/addfolder'
                    }}>
                        <motion.div
                            className="box"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <h1 className=' text-4xl flex justify-center mt-5 font-mono'>add</h1>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div>
                    {localStorage.getItem('token') ? <><div>
                        <h1 className='sm:text-9xl md:text-9xl lg:text-[210px] font-bold'>Let's Create something new</h1>
                    </div><div className='mt-20 flex justify-center' onClick={() => { window.location.href = '/addfolder'; }}>
                            <motion.div
                                className="box"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <h1 className='text-4xl flex justify-center mt-5 font-mono'>Create</h1>
                            </motion.div>
                        </div></> :
                        <><div>
                            <h1 className='sm:text-9xl md:text-9xl lg:text-[210px] font-bold'>Let's Create something new</h1>
                        </div><div className='mt-20 flex justify-center' onClick={() => { window.location.href = '/signup'; }}>
                                <motion.div
                                    className="box"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <h1 className='text-4xl flex justify-center mt-5 font-mono'>Create</h1>
                                </motion.div>
                            </div></>
                    }
                </div>
            )}
        </div>
    );
}

export default Landing;
