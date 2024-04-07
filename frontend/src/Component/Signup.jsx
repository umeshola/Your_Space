import { useState } from "react"
import axios from 'axios'
function Signup() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        
        try {
            const response = await axios.post('https://space-backend-two.vercel.app/signup', {
                name: name,
                password: pass,
                email: email
            });

            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                window.location = '/';
            } else if (response.status === 401) {
                alert("Incorrect password")
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("An error occurred while submitting the form");
        }
    };
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxxxx@gmail.com" required onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    <div>
                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input onChange={(e) => { setName(e.target.value) }} type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input onChange={(e) => { setPass(e.target.value) }} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Signup
