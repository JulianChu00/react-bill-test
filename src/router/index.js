import { createBrowserRouter } from "react-router-dom";
import Year from "@/pages/Year";
import Month from "@/pages/Month";
import Layout from "@/pages/layout";
import New from "@/pages/New";
import NotFound from "@/pages/NotFound";
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[
      {
        index:true,
        element:<Month></Month>,
      },
      {
        path:'year',
        element:<Year></Year>
      }
    ]
  },
  {
    path:'new',
    element:<New></New>
  },{
    path:'*',
    element:<NotFound></NotFound>
  }
])
export default router