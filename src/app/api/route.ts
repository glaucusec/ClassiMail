import { NextResponse } from "next/server";

type messagesType = {
  id: string;
  threadId: string;
};

async function fetchEmailData(id: string, email: string, token: string) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  const snippet = data.snippet;
  let sender = "";
  const headers = data.payload.headers;
  for (let header of headers) {
    if (header.name == "From") {
      sender = header.value;
      break;
    }
  }
  return { sender, snippet };
}

export async function POST(request: Request) {
  const email = "abhishekab.z10@gmail.com";
  const count = 10;
  const token = request.headers.get("authorization");
  if (!token || token == "") {
    return;
  }
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages?maxResults=${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const messages: messagesType[] = data.messages || [];

    const emails = messages.map((message) => message.id);
    const unresolvedEmailFetchPromises = emails.map((id) =>
      fetchEmailData(id, email, token)
    );

    const results = await Promise.all(unresolvedEmailFetchPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
