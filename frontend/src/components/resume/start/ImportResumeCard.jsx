import {
  UploadCloud,
} from "lucide-react";

const ImportResumeCard = () => {

  return (

    <label

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
        cursor-pointer
        block
      "
    >

      <input
        type="file"
        accept=".pdf"
        hidden
      />

      <div className="
        w-20
        h-20
        mx-auto
        rounded-2xl
        bg-emerald-100
        flex
        items-center
        justify-center
      ">

        <UploadCloud className="
          w-10
          h-10
          text-emerald-700
        " />

      </div>

      <h2 className="
        mt-6
        text-2xl
        font-bold
      ">

        Import Resume

      </h2>

      <p className="
        mt-3
        text-gray-500
      ">

        Upload an existing
        resume PDF.

      </p>

    </label>
  );
};

export default ImportResumeCard;