import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import close from '../assets/close.jpeg';
import de from '../assets/de.png'

function Folder() {
    let { id } = useParams();
    const [files, setFiles] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://space-backend-two.vercel.app/get_all_files/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                });
                if (response.status === 201) {
                    setFiles(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        const getname = async () => {
            try {
                const response = await axios.get(`https://space-backend-two.vercel.app/get_folder_name/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.status === 201) {
                    setName(response.data.data[0].foldername);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getname();
    }, [id]);

    return (
        <div className='mb-32'>
            <div className='flex justify-center text-5xl mb-28'>.{name}</div>
            <div className='flex flex-wrap mx-20' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                {files.map(item => (
                    <motion.div className=' relative' key={item._id} layoutId={item._id} onClick={() => { setSelectedId(item._id); setSelectedImage(item.image); }}>
                        <motion.div className='px-5 py-5 cursor-pointer '>
                            <img className='rounded-lg w-full object-contain h-60' src={item.image} alt="img" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            <AnimatePresence>
                {selectedId && (
                    <motion.div className='top-1/3 left-1/3 flex absolute' layoutId={selectedId} >
                        <motion.button onClick={() =>{
                                axios.put('https://space-backend-two.vercel.app/deleteimage',{
                                    imageid:selectedId
                                },{
                                    headers:{
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                }).then(()=>{
                                    window.location.href=`/folder/${id}`;
                                })
                            }}>
                            <img className='h-7 rounded-2xl' src={de} alt="delete" />
                        </motion.button>
                        <motion.div >
                            <img className='w-full rounded-2xl h-96 object-contain' src={selectedImage} alt="img" />
                        </motion.div>
                        <motion.button >
                            <img onClick={() => setSelectedId(null)} className='h-7 rounded-2xl' src={close} alt="close" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
            <a href={`/addimage/${id}`}>
                <div className='mt-20 flex justify-center'>
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <h1 className=' text-4xl flex justify-center mt-5 font-mono'>upload</h1>
                    </motion.div>
                </div>
            </a>
        </div>
    )
}

export default Folder;
