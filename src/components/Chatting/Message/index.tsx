import useUserStore from "../../../stores/useUserStore";
import moment from "moment";

interface MessageObjectType {
  timestamp: number;
  contentMsg: string;
  user: {
    id: string;
    image: string;
    name: string;
  };
}

const Message = ({ message }: { message: MessageObjectType }) => {
  const { userInfo } = useUserStore();

  const timeFromNow = (timestamp: number) => moment(timestamp).fromNow();

  return (
    <>
      {userInfo.uid !== message.user.id ? (
        <div className="flex gap-2 mb-2">
          <img
            src={message.user.image}
            alt={message.user.name}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div>
            <div>{message.user.name}</div>
            <div className="bg-slate-300 p-2 rounded-b-xl rounded-tr-xl">
              {message.contentMsg}
            </div>
          </div>
          <div className="flex items-end text-gray-300 text-xs">
            {timeFromNow(message.timestamp)}
          </div>
        </div>
      ) : (
        <div className="flex mb-2 justify-end">
          <div className="flex gap-2">
            <div className="flex items-end text-gray-300 text-xs">
              {timeFromNow(message.timestamp)}
            </div>
            <div className="bg-theme-color text-white font-light p-2 rounded-t-xl rounded-bl-xl">
              {message.contentMsg}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
