import { useState } from "react";
import { IoSend } from "react-icons/io5";

interface InputProps {
  onSend: (pointA: string, pointB: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState("");
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");

  const sendInput = () => {
    onSend(pointA, pointB);
    setPointA("");
    setPointB("");
  };

  const handleKeyDown = (event: any) => {
    // Enter key pressed
    if (event.keyCode === 13) {
      sendInput();
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center rounded-lg border-2 bg-white p-2 dark:border-gray-700">
      <input
        type="text"
        value={pointA}
        onChange={(ev: any) => setPointA(ev.target.value)}
        className="w-full rounded-lg bg-transparent px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-100"
        placeholder="Where are you now?"
        disabled={disabled}
        onKeyDown={(ev) => handleKeyDown(ev)}
      />
      <input
        type="text"
        value={pointB}
        onChange={(ev: any) => setPointB(ev.target.value)}
        className="w-full rounded-lg bg-transparent px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-100"
        placeholder="Where do you want to be?"
        disabled={disabled}
        onKeyDown={(ev) => handleKeyDown(ev)}
      />
      {disabled ? (
        <img src="loading.gif" alt="Loading" width={40} height={40} />
      ) : (
        <button onClick={() => sendInput()} className="px-2">
          <IoSend className="h-8 w-8 text-primary" />
        </button>
      )}
    </div>
  );
};
