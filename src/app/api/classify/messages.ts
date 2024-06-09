import OpenAI from "openai";

export const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: `
        You will be given an array that contains up to 15 objects.
        The objects contain some information about the e-mails fetched from Google GMail API.
        Here is an example of the structure of the data you will be given:
        [ 
          { 
            sender: "Sender of the email", 
            snippet: "A small summary of the email snippet",
            messageId: "unique id of the email",
            labelIds: ["Array that contains labels related to the mail"]
          },
          ...
        ]
      `,
  },
  {
    role: "user",
    content: `
        You have to take the input data and return an array of objects that contain the messageId as the key
        and the category of that email. 
        You have to ensure that the category of the email matches one of the following:
        1. Important: Emails that are personal or work-related and require immediate attention.
        2. Promotions: Emails related to sales, discounts, and marketing campaigns.
        3. Social: Emails from social networks, friends, and family.
        4. Marketing: Emails related to marketing, newsletters, and notifications.
        5. Spam: Unwanted or unsolicited emails.
        6. General: If none of the above are matched, use General.
      `,
  },
  {
    role: "user",
    content: `
        How should you classify? You can consider the labelIds provided for each email.
        Those are the labelIds provided by Google itself. If the labelId 
        somehow relates or matches any of the 6 categories, you have to give priority to that.
        If not, you should give the accurate, most related category of that email.
      `,
  },
  {
    role: "user",
    content: `
        What is the format of the output? The output should be an array with objects that has messageId
        as the key and category as the value. You don't need to provide any other information or description.
        Return an array like this:
        [
          {"<messageId>": "Important"},
          {"<messageId>": "Promotions"},
          {"<messageId>": "Social"},
          {"<messageId>": "Marketing"},
          {"<messageId>": "Spam"},
          {"<messageId>": "General"}
        ]
        The messageId is the value of messageId from the given input data. 
        Just return an array like this and give no more response.
        Keep in mind that the output (which is your response) is directly used with JavaScript,
        so make sure the array is returned in the format of a JavaScript array and not in a code block format.
      `,
  },
];
