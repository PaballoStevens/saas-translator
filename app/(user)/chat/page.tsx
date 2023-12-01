import ChatList from "@/components/ChatList";

type Props = {
    params: {}
        searchParams: {
            error: string;
     };
};

function Chatspage({ searchParams: { error} }: Props) {
  return (
    <div>
        <ChatList />          
    </div>
  )
}

export default Chatspage