import useState from "react-usestateref";
import { Creator, ChatMessage, MessageProps } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";

export default function Home() {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (pointA: string, pointB: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: `Currently, I'm at ${pointA}. I want to achieve ${pointB}. Create me a plan to succeed this.`,
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
    <main className="relative mx-auto max-w-2xl">
      <div className="sticky top-0 w-full px-4 pt-10">
        <ChatInput
          onSend={(pointA, pointB) => callApi(pointA, pointB)}
          disabled={loading}
        />
      </div>

      <div className="mt-10 space-y-3 px-4">
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
  );
}
