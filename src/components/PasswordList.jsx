import React  from 'react'


const PasswordList = ({handleToast , Passwords, setPasswords , setValue}) => {
  

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/delete_password/${id}`) 
   
    if (response.ok) {
      setPasswords(prevPasswords => prevPasswords.filter(password => password._id !== id));
  }
    
  }

  const handleEdit = async  (id) => {
     
    const password = Passwords.find(password => password._id === id);
   setValue("name" , password.name)
   setValue("url" , password.url)
   setValue("password" , password.password) 
   handleDelete(id);
  }
 
  return (


    <div

      className="bg-black border border-white  rounded-lg shadow-md w-full overflow-auto max-h-[35vh] hide-scrollbar"
      style={{ padding: "16px", marginTop: "15px", marginBottom: "15px" }}
    >
      <h3 className="text-xl  text-white font-semibold  " style={{ marginBottom: "16px" }}>
        Your Passwords
      </h3>
      {Passwords.length === 0 && <p className="text-white text-center text-md">No Passwords Saved Yet!</p>}
      <table
        className="w-full border-collapse border border-gray-300 rounded-xl "
        style={{ marginBottom: "16px" }}
      >
        {/* Table Header */}
        {Passwords.length !== 0 && 
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="border border-gray-300 text-left" style={{ padding: "12px" }}>Site</th>
            <th className="border border-gray-300 text-left" style={{ padding: "12px" }}>Username</th>
            <th className="border border-gray-300 text-left" style={{ padding: "12px" }}>Password</th>
            <th className="border border-gray-300 text-left" style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        }

        {/* Table Body */}
        <tbody>
          {/* Sample Row */}

        {Passwords.map(({url , name , password , _id}) => { 
          return   <tr key={_id} id={_id} className="bg-black text-white">

            <td className="border border-gray-300 flex gap-3" style={{ padding: "10px" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="Website Logo"
                className="inline-block w-6 h-6 mr-2"
                />
              {url}
              <span onClick={() => handleToast("URL Copied!" , url)}  className='cursor-pointer'   style={{ marginLeft: "10px" }} >🔗</span>
            </td>
            <td className="border border-gray-300" style={{ padding: "10px" }}>
              {name} <span   className='cursor-pointer'  onClick={ () => handleToast("Name Copied!" , name)}>👤</span>
            </td>
            <td className="border border-gray-300" style={{ padding: "10px" }}>
               ••••••  <button onClick={() => handleToast("Password Copied!" , password)} className="ml-2 text-gray-600 transition-all cursor-pointer hover:text-gray-900">📋</button>
            </td>
            <td className="border border-gray-300" style={{ padding: "10px" }}>
              <button onClick={() => handleEdit(_id)} className="text-blue-600 transition-all hover:text-blue-800 cursor-pointer" style={{ marginRight: "8px" }}>✏️</button>
              <button onClick={() => handleDelete(_id)} className="text-red-600 transition-all cursor-pointer hover:text-red-800" >🗑️</button>
            </td>
          </tr>
              })}


        </tbody>
      </table>


     


    </div>

  )
}

export default PasswordList
