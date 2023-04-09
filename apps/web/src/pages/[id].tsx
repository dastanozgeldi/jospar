import { useRouter } from "next/router";
import { ChatMessage, MessageProps } from "src/components/ChatMessage";
import { trpc } from "src/utils/trpc";

const PlanPage = () => {
  const { query } = useRouter();
  const { data: plan } = trpc.plan.byId.useQuery({ id: query.id as string });
  return (
    <div>
      <div className="mt-10 space-y-3 px-4 m-auto">
        {plan &&
          plan.messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.content}
              from={plan.userId ? 0 : 1}
            />
          ))}
        {plan?.messages.length == 0 && (
          <p className="text-center text-gray-400">
            What do you want to learn today?
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
