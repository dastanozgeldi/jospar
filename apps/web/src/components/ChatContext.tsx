import clsx from "clsx";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { styles } from "../styles";
import { BiLogInCircle } from "react-icons/bi";
import { Avatar } from "./common/Avatar";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

interface InputProps {
  onSend: (
    pointA: string,
    pointB: string,
    time: string,
    resources: boolean
  ) => void;
  disabled: boolean;
}

export const ChatContext = ({ onSend, disabled }: InputProps) => {
  const { data: session } = useSession();
  const utils = trpc.useContext();

  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const [time, setTime] = useState("");
  const [resources, setResources] = useState(false);

  const sendInput = () => {
    onSend(pointA, pointB, time, resources);
    setPointA("");
    setPointB("");
    setTime("");
    setResources(false);
  };

  const addPlan = trpc.plan.add.useMutation({
    async onSuccess() {
      await utils.plan.all.invalidate();
    },
  });

  return (
    <section className="p-4">
      <div className="my-4 flex items-center justify-end gap-6">
        {session ? (
          <Link
            href="/dashboard"
            className="rounded-full ring-gray-300 hover:ring-2"
          >
            <Avatar src={session.user?.image} size={32} />
          </Link>
        ) : (
          <button className="text-xl" onClick={() => signIn()}>
            <BiLogInCircle size={32} />
          </button>
        )}
        <button className="py-2 px-4 dark:bg-white dark:text-black bg-black text-white rounded-lg font-medium">
          Share
        </button>
      </div>
      <div className="flex flex-col gap-6 justify-center dark:border-gray-700">
        <h1 className="text-3xl font-bold">Context</h1>
        <input
          type="text"
          value={pointA}
          onChange={(ev: any) => setPointA(ev.target.value)}
          className="w-full rounded-lg bg-transparent px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-100 border-gray-500 border"
          placeholder="Point A"
          disabled={disabled}
        />
        <input
          type="text"
          value={pointB}
          onChange={(ev: any) => setPointB(ev.target.value)}
          className="w-full rounded-lg bg-transparent px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-100 border-gray-500 border"
          placeholder="Point B"
          disabled={disabled}
        />
        <input
          type="text"
          value={time}
          onChange={(ev: any) => setTime(ev.target.value)}
          className="w-full rounded-lg bg-transparent px-3 py-2 text-gray-800 focus:outline-none dark:text-gray-100 border-gray-500 border"
          placeholder="Dedicate time for the plan"
          disabled={disabled}
        />
        <div className="flex items-center gap-2">
          <input
            id="resources"
            type="checkbox"
            defaultChecked={resources}
            onChange={() => setResources(!resources)}
            placeholder="Point B"
            disabled={disabled}
          />
          <label htmlFor="resources">Send resources</label>
        </div>
        <button
          onClick={() => sendInput()}
          className={clsx(styles.button, "max-w-max")}
        >
          Send
          {disabled ? (
            <img src="loading.gif" alt="Loading" width={16} height={16} />
          ) : (
            <IoSend className="h-4 w-4" />
          )}
        </button>

        {/* New Plan */}
        <button
          className={clsx(
            styles.button,
            "absolute bottom-4 m-auto justify-center w-[90%]"
          )}
          onClick={() => {
            console.log({ pointA, userId: session?.user?.id });
            addPlan.mutateAsync({
              title: "Second title",
              userId: session?.user?.id!,
            });
          }}
        >
          <FaPlus className="w-5 h-5" /> New Plan
        </button>
      </div>
    </section>
  );
};
