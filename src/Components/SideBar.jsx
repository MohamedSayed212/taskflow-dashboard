import logo from "../assets/logo.png";
import profilePicture from "../assets/profilePicture.webp";
const SideBar = () => {
  return (
    <div className="bg-neutral-200 p-4 h-screen w-72">
      {/*  logo and name */}
      <div className="flex items-center mt-4 gap-2">
        <img src={logo} alt="logo" className="w-12 h-12 " />
        <h2 className="text-xl font-semibold">TaskFLow</h2>
      </div>
      {/* profile card */}
      <div className="flex items-center gap-3 mt-8 border-neutral-300 rounded-lg p-2 border-2 ">
        <img
          src={profilePicture}
          alt="anonimous"
          className="w-12 h-12 rounded-full"
        />
        {/* text */}
        <div className="">
          <p>name</p>
          <p>name@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
