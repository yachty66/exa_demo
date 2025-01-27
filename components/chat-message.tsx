interface ChatMessageProps {
  message: {
    text:
      | string
      | Array<{
          title: string;
          summary: string;
          url: string;
        }>;
    isUser: boolean;
  };
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  if (isLoading) {
    return (
      <div className="p-4 rounded-lg bg-gray-800/50">
        <div className="flex items-start gap-2">
          <img
            src="/exa_ai_logo.jpeg"
            alt="Exa AI"
            className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
          />
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  if (typeof message.text === "string") {
    return (
      <div
        className={`p-4 rounded-lg ${
          message.isUser ? "bg-gray-900/50" : "bg-gray-800/50"
        }`}
      >
        <div className="flex items-start gap-2">
          {message.isUser ? (
            <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0" />
          ) : (
            <img
              src="/exa_ai_logo.jpeg"
              alt="Exa AI"
              className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
            />
          )}
          <p className="text-white">{message.text}</p>
        </div>
      </div>
    );
  }

  // Render formatted responses
  return (
    <div className="p-4 rounded-lg bg-gray-800/50">
      <div className="flex items-start gap-2">
        <img
          src="/exa_ai_logo.jpeg"
          alt="Exa AI"
          className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
        />
        <div className="flex-1 space-y-4">
          {message.text.map((result, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-4 last:border-0"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {result.title}
              </h3>
              <p className="text-gray-300 mb-2">{result.summary}</p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mt-2 inline-block"
              >
                Link →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
