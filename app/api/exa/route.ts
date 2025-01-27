import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    const options = {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_EXA_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        useAutoprompt: true,
        type: "auto",
        category: "research paper",
        numResults: 1,
        includeDomains: ["arxiv.org", "paperswithcode.com"],
        excludeDomains: [],
        startCrawlDate: "2023-01-01T00:00:00.000Z",
        endCrawlDate: "2023-12-31T00:00:00.000Z",
        startPublishedDate: "2023-01-01T00:00:00.000Z",
        endPublishedDate: "2023-12-31T00:00:00.000Z",
        includeText: ["large language model"],
        excludeText: ["course"],
        contents: {
          text: true,
          highlights: {
            numSentences: 1,
            highlightsPerUrl: 1,
            query: "Key advancements",
          },
          summary: { query: "Main developments" },
          livecrawl: "always",
          livecrawlTimeout: 1000,
          subpages: 1,
          subpageTarget: "sources",
          extras: {
            links: 1,
            imageLinks: 1,
          },
        },
      }),
    };

    const response = await fetch("https://api.exa.ai/search", options);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // Extract relevant information from the first result
    const result = data.results?.[0];
    if (!result) {
      return NextResponse.json(
        {
          error: "No results found",
        },
        { status: 404 }
      );
    }

    // Format the response with all relevant information
    const formattedResponse = {
      title: result.title,
      summary: result.summary,
      authors: result.author,
      publishedDate: result.publishedDate,
      highlights: result.highlights,
      url: result.url,
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
