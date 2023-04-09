import { FaRobot, FaUser } from "react-icons/fa";

export enum Creator {
  Me = 0,
  Bot = 1,
}

export interface MessageProps {
  text: string;
  from: Creator;
}

export const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <>
      {from == Creator.Me && (
        <div className="flex items-center gap-4 whitespace-pre-wrap rounded-lg bg-white p-4 dark:bg-gray-900">
          <FaUser size={40} className="text-primary" />
          <p className="text-gray-700 dark:text-gray-200">{text}</p>
        </div>
      )}
      {from == Creator.Bot && (
        <div className="flex items-center gap-4 whitespace-pre-wrap rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <FaRobot size={40} className="text-primary" />
          <p className="text-gray-700 dark:text-gray-200">{text}</p>
        </div>
      )}
    </>
  );
};
