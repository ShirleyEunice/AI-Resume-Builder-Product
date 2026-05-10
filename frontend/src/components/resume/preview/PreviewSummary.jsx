const PreviewSummary = ({ summary }) => {
  return (
    <div className="mt-8">

      <h2 className="text-xl font-semibold border-b pb-2 mb-3">
        Professional Summary
      </h2>

      <p className="leading-7 text-gray-700 whitespace-pre-line">

        {summary ||
          "Your professional summary appears here."}

      </p>

    </div>
  );
};

export default PreviewSummary;