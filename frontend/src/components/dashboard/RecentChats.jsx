import React from "react";

import {
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const chats = [
  {
    id: 1,

    title:
      "Frontend React Interview",

    preview:
      "Explain useMemo vs useCallback",

    updated:
      "10 minutes ago",
  },

  {
    id: 2,

    title:
      "System Design Mock",

    preview:
      "How would you scale Redis caching?",

    updated:
      "Yesterday",
  },

  {
    id: 3,

    title:
      "Behavioral Interview",

    preview:
      "Tell me about a challenge you solved",

    updated:
      "3 days ago",
  },
];

const RecentChats = () => {

  const navigate =
    useNavigate();

  return (

    <div className="
      bg-white
      rounded-3xl
      px-4 py-3
      shadow-sm
      border
    ">

      {/* HEADER */}
      <div className="
        flex
        items-center
        justify-between
        mb-2
      ">

        <div>

          <h2 className="
            text-xl
            font-bold
          ">
            Recent Interview Chats
          </h2>

          <p className="
            text-xs
            text-gray-500
            mt-1
          ">
            Continue your AI interview prep
          </p>

        </div>

      </div>

      {/* CHAT LIST */}
      <div className="space-y-3">

        {
          chats.map(
            (chat) => (

              <button
                key={chat.id}

                onClick={() =>
                  navigate(
                    `/interview-chat/${chat.id}`
                  )
                }

                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  text-left
                  hover:bg-gray-50
                  hover:border-violet-300
                  transition-all
                  duration-200
                  group
                "
              >

                <div className="
                  flex
                  items-start
                  justify-between
                ">

                  {/* LEFT */}
                  <div className="
                    flex
                    gap-4
                  ">

                    {/* ICON */}
                    <div className="
                      w-12
                      h-12
                      rounded-xl
                      bg-violet-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">

                      <MessageSquare
                        className="
                          text-violet-600
                        "
                      />

                    </div>

                    {/* CONTENT */}
                    <div>

                      <h3 className="
                        font-semibold
                        text-gray-800
                      ">
                        {chat.title}
                      </h3>

                      <p className="
                        text-xs
                        text-gray-500
                        mt-2
                        leading-relaxed
                      ">
                        {chat.preview}
                      </p>

                      <p className="
                        text-xs
                        text-gray-400
                        mt-3
                      ">
                        {chat.updated}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <ArrowRight
                    className="
                      w-5
                      h-5
                      text-gray-400
                      group-hover:text-violet-600
                      transition
                    "
                  />

                </div>

              </button>
            )
          )
        }

      </div>

      {/* FOOTER */}
      <button
        onClick={() =>
          navigate("/interview-chat")
        }

        className="
          mt-6
          w-full
          border
          border-dashed
          border-gray-300
          rounded-2xl
          py-3
          text-xs
          font-medium
          text-gray-600
          hover:border-violet-400
          hover:text-violet-600
          transition
        "
      >

        View All Chats

      </button>

    </div>
  );
};

export default RecentChats;