import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = (props) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }

  console.log(token);
  return <Route {...props} />;
};

//  <ProtectedRoute exact path="/" component={Home} />
//  <ProtectedRoute exact path="/products" component={Products} />
//  <ProtectedRoute exact path="/cart" component={Cart} />
