import { useSelector } from "react-redux";

const MinimalHeader = () => {

  const { personalInfo } = useSelector(
    (state) => state.resume.currentResume
  );

  const previewInfo = {

    fullName:
      personalInfo.fullName ||
      "Jennifer Jobscan",

    headLine:
      personalInfo.headLine ||
      "Product Manager",

    email:
      personalInfo.email ||
      "jennifer@resume.com",

    phone:
      personalInfo.phone ||
      "(123) 456-7890",

    location:
      personalInfo.location ||
      "Seattle, WA",

  };

  return (

    <div className="text-center">

      <h1
        className="
          text-2xl
          font-light
          tracking-wide
          text-gray-900
        "
      >
        {previewInfo.fullName}
      </h1>

      <p
        className="
          text-xs
          text-gray-500
          mt-1
        "
      >
        {previewInfo.headLine}
      </p>

      <div
        className="
          mt-2
          flex
          justify-center
          gap-3
          flex-wrap
          text-[11px]
          text-gray-500
        "
      >

        <span>{previewInfo.email}</span>

        <span>{previewInfo.phone}</span>

        <span>{previewInfo.location}</span>

      </div>

    </div>

  );
};

export default MinimalHeader;