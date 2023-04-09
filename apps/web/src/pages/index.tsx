import useState from "react-usestateref";
import { Creator, ChatMessage, MessageProps } from "../components/ChatMessage";
import { ChatContext } from "../components/ChatContext";
import { Sidebar } from "../layouts/Sidebar";

export default function Home() {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (
    pointA: string,
    pointB: string,
    time: string,
    resources: boolean
  ) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: `Currently, I'm a ${pointA}. I want to achieve ${pointB}. Create me a plan to succeed this goal in ${time}.${
        resources &&
        " Also, please provide links to each section for further learning."
      }`,
      from: Creator.Me,
      key: new Date().getTime(),
    };

    setMessages([...messagesRef.current, myMessage]);
    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: myMessage.text,
      }),
    }).then((response) => response.json());
    setLoading(false);

    console.log(response.text);

    if (response.text) {
      const botMessage: MessageProps = {
        text: response.text,
        from: Creator.Bot,
        key: new Date().getTime(),
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      // Show error
    }

    console.log(messages);
  };

  return (
    <>
      <main className="max-w-2xl">
        <div className="mt-10 space-y-3 px-4 m-auto">
          {messages.map(({ key, text, from }: MessageProps) => (
            <ChatMessage key={key} text={text} from={from} />
          ))}
          {messages.length == 0 && (
            <p className="text-center text-gray-400">
              What do you want to learn today?
            </p>
          )}
        </div>
      </main>
      <div className="fixed top-0 right-0 w-1/5 h-screen border-l-gray-500 border-l">
        <ChatContext
          onSend={(pointA, pointB, time, resources) =>
            callApi(pointA, pointB, time, resources)
          }
          disabled={loading}
        />
      </div>
    </>
  );
}
