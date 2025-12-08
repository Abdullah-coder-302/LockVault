const Navbar = () => {
    return (
      <nav  style={{padding: "16px"}} className="bg-black text-white  shadow-md p flex justify-between items-center">
        <h1 className="text-2xl   font-bold">PassVault</h1>
        <ul className="flex gap-6">
          <li><a href="#" className="hover:text-gray-400">Home</a></li>
          <li><a href="#" className="hover:text-gray-400">Features</a></li>
          <li><a href="#" className="hover:text-gray-400">About</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  