import { useNavigate } from "react-router-dom";
export default function ExploreFriend() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 text-center">
      <h3 className="text-3xl font-semibold text-white mb-4">
        Ready to make new friends?
      </h3>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/friends");
        }}
        className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-lg hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-110"
      >
        Explore Friends
      </button>
    </div>
  );
}
