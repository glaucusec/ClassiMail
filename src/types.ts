export type messagesType = {
  id: string;
  threadId: string;
};

export type emailType = {
  sender: string;
  snippet: string;
  messageId: string;
  labelIds: string[];
  category:
    
};

export type CategoryType = 
  | 'Important'
  | 'General'
  | 'Spam'
  | 'Promotions'
  | 'Social'
  | 'Marketing'
  | '';
 
