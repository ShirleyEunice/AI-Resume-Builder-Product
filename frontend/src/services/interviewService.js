import API from "@/api/axios";

// Start a new session. Pass EITHER `resumeId` (saved resume) OR `file` (a PDF
// to upload — it gets parsed and saved to Resume Manager). `targetRole` and
// `jobDescription` are optional.
export const startInterviewSession = async ({
  mode,
  resumeId,
  file,
  targetRole,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("mode", mode);
  if (file) formData.append("file", file);
  if (resumeId) formData.append("resumeId", resumeId);
  if (targetRole) formData.append("targetRole", targetRole);
  if (jobDescription) formData.append("jobDescription", jobDescription);

  const response = await API.post("/agent/interview/session", formData);
  return response.data;
};

// Send a message in an existing session.
export const sendInterviewMessage = async ({ message, chatId }) => {
  const response = await API.post("/agent/interview", { message, chatId });
  return response.data;
};

// List the current user's sessions (lightweight).
export const getChats = async () => {
  const response = await API.get("/agent/chats");
  return response.data;
};

// Load a full session (messages + context) to resume it.
export const getChatById = async (id) => {
  const response = await API.get(`/agent/chats/${id}`);
  return response.data;
};

// Delete a session (Interview Library).
export const deleteChat = async (id) => {
  const response = await API.delete(`/agent/chats/${id}`);
  return response.data;
};
