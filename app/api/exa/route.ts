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
        numResults: 5,
        contents: {
          text: true,
          highlights: {
            numSentences: 1,
            highlightsPerUrl: 1,
            query: "Key points",
          },
          summary: { query: "Main points" },
          livecrawl: "always",
          livecrawlTimeout: 1000,
          subpages: 1,
          extras: {
            links: 1,
            imageLinks: 1,
          },
        },
      }),
    };

    const response = await fetch("https://api.exa.ai/search", options);
    const data = await response.json();

    // Log the full response from Exa API
    console.log("Exa API Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // Extract relevant information from all results (up to 5)
    const formattedResponse =
      data.results?.slice(0, 5).map((result) => ({
        title: result.title,
        summary: result.summary,
        url: result.url,
      })) || [];

    if (formattedResponse.length === 0) {
      return NextResponse.json(
        {
          error: "No results found",
        },
        { status: 404 }
      );
    }

    // Log the formatted response we're sending back
    console.log(
      "Formatted Response:",
      JSON.stringify(formattedResponse, null, 2)
    );

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
