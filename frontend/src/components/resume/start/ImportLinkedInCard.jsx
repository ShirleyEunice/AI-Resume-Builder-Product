import LinkedInIcon from "@mui/icons-material/LinkedIn";
import toast from "react-hot-toast";

const ImportLinkedInCard = () => {

  const handleLinkedIn = () => {

    toast(
      "LinkedIn import coming soon"
    );
  };

  return (

    <button

      onClick={handleLinkedIn}

      className="
        bg-white
        rounded-3xl
        border
        p-10
        text-center
        shadow-sm
        hover:shadow-xl
        transition
        hover:-translate-y-1
      "
    >

      <div className="
        w-20
        h-20
        mx-auto
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
      ">

        <LinkedInIcon className="
          w-10
          h-10
          text-blue-700
        " />

      </div>

      <h2 className="
        mt-6
        text-2xl
        font-bold
      ">

        Import LinkedIn

      </h2>

      <p className="
        mt-3
        text-gray-500
      ">

        Import your LinkedIn
        profile automatically.

      </p>

    </button>
  );
};

export default ImportLinkedInCard;