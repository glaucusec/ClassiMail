import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { emailType, messagesType } from "@/types";

type Params = {
  count: string;
};

async function fetchEmailData(
  id: string,
  email: string,
  token: string
): Promise<emailType> {
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching email data: ${response.statusText}`);
    }
    const data = await response.json();
    const labelIds = data.labelIds;
    const snippet = data.snippet;
    let sender = "";
    const headers = data.payload.headers;
    for (let header of headers) {
      if (header.name === "From") {
        sender = header.value;
        break;
      }
    }

    return { sender, snippet, messageId: id, labelIds, category: "" };
  } catch (error) {
    console.error(`Error fetching email data for id ${id}:`, error);
    return {
      sender: "",
      snippet: "",
      messageId: id,
      labelIds: [],
      category: "",
    };
  }
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const count = parseInt(context.params.count, 10);
  if (isNaN(count)) {
    // Check if count is NaN
    console.error("Invalid count parameter");
    return NextResponse.json(
      { error: "Invalid count parameter" },
      { status: 400 }
    );
  }
  const session = await auth();
  if (!session) {
    console.error("No session found");
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }
  const token = session.access_token || "";
  const email = session.user?.email || "";

  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages?maxResults=${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }
    const data = await response.json();
    const messages: messagesType[] = data.messages || [];

    const concurrencyLimit = 3;
    const fetchEmailsWithLimit = async (ids: string[]) => {
      const results: emailType[] = [];
      for (let i = 0; i < ids.length; i += concurrencyLimit) {
        const chunk = ids.slice(i, i + concurrencyLimit);
        const chunkResults = await Promise.all(
          chunk.map((id) => fetchEmailData(id, email, token))
        );
        results.push(...chunkResults);
      }
      return results;
    };

    const emails: string[] = messages.map((message) => message.id);
    const results = await fetchEmailsWithLimit(emails);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching email previews:", error);
    return NextResponse.json(
      { error: "fetching email previews" },
      { status: 500 }
    );
  }
}
