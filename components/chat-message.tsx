interface ChatMessageProps {
    message: {
      text: string
      isUser: boolean
    }
  }
  
  export function ChatMessage({ message }: ChatMessageProps) {
    return (
      <div className={`p-4 rounded-lg ${message.isUser ? "bg-gray-900/50" : "bg-gray-800/50"}`}>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0" />
          <p className="text-white">{message.text}</p>
        </div>
      </div>
    )
  }
  
  