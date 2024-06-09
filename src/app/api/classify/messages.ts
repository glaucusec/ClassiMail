import OpenAI from "openai";

export const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: `
    You will be provided an array of objects . the objects are data of e-mails. You have to format in a way that it should match the following categories. 1. Important: Emails that are personal or work-related and require immediate attention such as banking.
      2. Promotions: Emails related to sales, discounts, and marketing campaigns.
      3. Social: Emails from social networks, friends, and family.
      4. Marketing: Emails related to marketing, newsletters, and notifications.
      5. Spam: Unwanted or unsolicited emails.
      6. General: If none of the above are matched, use General. The output should be a json object with messageid as the key and category you found as the value. `,
  },
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
        You have to take the input data and return an object of key value pairs that contain the messageId as the key
        and the category of that email. 
        You have to ensure that the category of the email matches one of the following:
        1. Important: Emails that are personal or work-related and require immediate attention.
        2. Promotions: Emails related to sales, discounts, and marketing campaigns.
        3. Social: Emails from social networks, friends, and family.
        4. Marketing: Emails related to marketing, newsletters, and notifications.
        5. Spam: Unwanted or unsolicited emails.
        6. General: If none of the above are matched, use General.

        You can have better knowledge of these categories below:
        Certainly, here's a more detailed description for each email category:

1. **Important**:
   - These emails hold significant relevance to the recipient's immediate attention, often pertaining to critical matters in either personal or professional spheres. They typically originate from known contacts such as supervisors, colleagues, family members, or close friends. Examples include urgent work-related requests, time-sensitive project updates, crucial personal communications, or important event invitations. The sender's identity and the urgency conveyed in the email content mark it as deserving of prompt attention.

2. **Promotions**:
   - Promotional emails are marketing communications sent by businesses and organizations to advertise products, services, or events to a wide audience. They often feature enticing offers, discounts, or announcements aimed at encouraging recipients to make purchases or engage with the sender's brand. Examples include promotional newsletters from retailers, announcements of sales events, special offers on subscription services, or updates on upcoming product launches. These emails commonly contain keywords such as "sale," "discount," "limited-time offer," or "exclusive deal."

3. **Social**:
   - Social emails encompass communications from various social networking platforms, personal contacts, and social circles. These emails facilitate interpersonal connections, updates, and interactions within the recipient's social sphere. Examples include notifications of new friend requests, direct messages, event invitations, or updates on social media activity. They often originate from platforms like Facebook, Twitter, Instagram, LinkedIn, or messaging apps, reflecting interactions with friends, family, colleagues, or online communities.

4. **Marketing**:
   - Marketing emails constitute communications from businesses, brands, or organizations aimed at promoting their products, services, or initiatives. They serve to inform, engage, and persuade recipients to take specific actions, such as making purchases, subscribing to newsletters, or attending events. Examples include company newsletters, product announcements, promotional offers, or updates on industry trends. These emails typically feature branding elements, informative content, and calls-to-action designed to drive customer engagement and conversion.

5. **Spam**:
   - Spam emails are unsolicited and often unwanted messages that inundate recipients' inboxes with irrelevant, deceptive, or malicious content. They pose various risks, including phishing attempts, malware distribution, or fraudulent schemes. Examples include unsolicited advertisements, fake lottery winnings, phishing emails impersonating legitimate institutions, or malicious attachments containing viruses or malware. Recognizable by their dubious sender addresses, generic greetings, suspicious links, or poor grammar, spam emails should be promptly identified and avoided to mitigate potential security threats.

6. **General**:
   - General emails encompass a broad range of communications that do not fit neatly into other predefined categories. They may include routine notifications, informational updates, non-urgent correspondence, or miscellaneous messages from various sources. Examples include system-generated alerts, subscription confirmations, automated reminders, or personal communications lacking specific urgency or promotional intent. While these emails may lack distinct characteristics of other categories, they contribute to the overall flow of communications in the recipient's inbox, warranting acknowledgment and organization for efficient email management.
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
        What is the format of the output? The output should be an object with key value pairs that has messageId
        as the key and category as the value. You don't need to provide any other information or description.
        Return an object like this:
        {
          "<messageId>": "Important",
          "<messageId>": "Promotions",
          "<messageId>": "Social",
          "<messageId>": "Marketing",
          "<messageId>": "Spam",
          "<messageId>": "General"
        }
        The messageId is the value of messageId from the given input data. 
        Just return an object like this and give no more response.
        Keep in mind that the output (which is your response) is directly used with JavaScript,
        so make sure the object is returned in the format of a JavaScript object and not in a code block format.
      `,
  },
];
