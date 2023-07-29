import {} from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { CreateQuestionPage } from "./question/create.tsx";
import { ViewQuestionPage } from "./question/view.tsx";
import { ListQuestionPage } from "./question/list.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/question/create",
        element: <CreateQuestionPage />,
      },
      {
        path: "/question/:id",
        element: <ViewQuestionPage />,
      },
      {
        path: "/question",
        element: <ListQuestionPage />,
      },
    ],
  },
]);
