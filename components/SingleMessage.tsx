import { cn } from "@/lib/utils";
import { IconCopy } from "@tabler/icons-react";
import { FC } from "react";
import toast from "react-hot-toast";

interface SingleMessageProps {
  title: "bot" | "user";
  text: string;
  who: "bot" | "user";
}

const SingleMessage: FC<SingleMessageProps> = (props) => {
  const copySummary = () => {
    navigator.clipboard.writeText(props.text);
    toast.success("Summary copied to clipboard");
  };

  const isUser = props.who === "user";

  return (
    <div
      className={cn("flex h-fit", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={cn("rounded-lg p-2 max-w-[80%] w-fit", {
          "bg-gray-800": isUser,
          "bg-gradient-to-t from-orange-400 to-orange-600 text-white": !isUser,
        })}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold mb-2">
            {props.title === "bot" ? "🤖" : "🧍‍♂️"}
          </h1>
          <button onClick={copySummary}>
            <IconCopy
              size={20}
              className={cn("text-gray-400", {
                "text-white": !isUser,
              })}
            />
          </button>
        </div>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default SingleMessage;
