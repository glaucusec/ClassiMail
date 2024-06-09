import { CategoryType } from "@/types";
import React from "react";

const categoryClasses = {
  Important: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Promotions:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Social: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Marketing:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Spam: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  General:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

function getCategoryClasses(category: CategoryType): string {
  return categoryClasses[category as keyof typeof categoryClasses] || "";
}

type EmailProps = {
  category: CategoryType;
};

const EmailBadge: React.FC<EmailProps> = ({ category }) => {
  return (
    <span
      className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${getCategoryClasses(
        category
      )}`}
    >
      {category}
    </span>
  );
};

export default EmailBadge;
