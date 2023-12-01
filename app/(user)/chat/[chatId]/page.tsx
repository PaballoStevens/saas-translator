import { authOptions } from "@/auth"
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { SortedMessagesRef } from "@/lib/converters/Message";
import { doc, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    chatId: string;
  }
}

async function Chatpage({ params: { chatId } }: Props) {

  const session = await getServerSession(authOptions);

  const initailMessages = (await getDocs(SortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
     <div className="flex-1">
      <ChatMessages
      chatId={chatId}
      session={session}
      initialMessages={initailMessages}
      />
     </div>
      <ChatInput chatId={chatId} />
    </>
  )
}

export default Chatpage