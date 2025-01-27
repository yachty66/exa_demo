interface ChatMessageProps {
  message: {
    text:
      | string
      | {
          title: string;
          summary: string;
          authors: string;
          publishedDate: string;
          highlights: string[];
          url: string;
        };
    isUser: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (typeof message.text === "string") {
    return (
      <div
        className={`p-4 rounded-lg ${
          message.isUser ? "bg-gray-900/50" : "bg-gray-800/50"
        }`}
      >
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0" />
          <p className="text-white">{message.text}</p>
        </div>
      </div>
    );
  }

  // Render formatted research paper response
  return (
    <div className="p-4 rounded-lg bg-gray-800/50">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {message.text.title}
          </h3>
          <p className="text-gray-300 mb-2">{message.text.summary}</p>
          <div className="text-sm text-gray-400">
            <p>Authors: {message.text.authors}</p>
            <p>
              Published:{" "}
              {new Date(message.text.publishedDate).toLocaleDateString()}
            </p>
            {message.text.highlights.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Key Highlights:</p>
                <ul className="list-disc list-inside">
                  {message.text.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            <a
              href={message.text.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mt-2 inline-block"
            >
              Read Paper →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
