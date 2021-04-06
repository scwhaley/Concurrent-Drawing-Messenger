import { useEffect } from "react";
import { Route } from "react-router-dom";

const Page = (props) => {

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  
  return <Route path={props.path} exact={props.exact} children={props.children}/>;
};

export default Page;