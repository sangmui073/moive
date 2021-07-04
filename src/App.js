import React, { Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom";
import clientRouter from "./configs/client-router";
import Loading from "./components/Display/Loading";
import adminRouter from "./configs/admin-router";
import TemplateClient from "./templates/Client/TemplateClient";
import TemplateAdmin from "./templates/Admin/TemplateAdmin";
import GuardAdmin from "./HOC/GuardAdmin";
import GuardClient from "./HOC/GuardClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CHECK_LOGIN } from "./redux/reducer/Constants/auth-constants";
import "./App.css"

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch({
        type: CHECK_LOGIN,
        payload: user,
      });
    }
  }, []);
  const renderClient = () => {
    return clientRouter.map((rou, index) => {
      const { Component, path, exact, checkLogin, home, booking } = rou;
      if (checkLogin) {
        //Lưu ý thứ tự đặt các HOC như ở đây là trang display ta chỉ cần bảo vệ bên trong
        //các TemplateClient đã login hay chưa vì nếu ta bao ngoài router như thằng admin
        // thì nó sẽ đá thẳng vào component cuối cùng được render ra ở clientRouter

        return (
          <Route key={index} path={path} exact={exact}>
            <GuardClient>
              <TemplateClient booking={booking} Component={Component} />
            </GuardClient>
          </Route>
        );
      }
      return (
        <Route key={index} path={path} exact={exact}>
          <TemplateClient home={home} Component={Component} />
        </Route>
      );
    });
  };
  const renderAdmin = () => {
    return adminRouter.map((rou, index) => {
      const { path, exact, Component, login } = rou;

      //ở đây xài HOC bao luôn router là vì chỉ cần check 1 điều kiện không phải là Quan trị thì ko vào được luôn
      // không giống với HOC ở trên ở đây check ngay ban đầu còn ở trên chỉ check trong các component
      if (login) {
        return (
          <Route key={index} component={Component} path={path} exact={exact} />
        )
      }
      return (
        <Route key={index} path={path} exact={exact}>
          <GuardAdmin >
            <TemplateAdmin Component={Component} />
          </GuardAdmin>
        </Route>
      );
    });
  };
  return (
    <>
      <Loading />
      <Suspense fallback={<Loading />}>
        <Switch>
          {renderClient()}
          {renderAdmin()}
          <Route path="">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;



{/* <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              timeout={300}
              key={location.key}
              classNames="fade"
            >
              <Switch location={location}>
              
              </Switch>
            </CSSTransition >
          </TransitionGroup>
        )} /> */}

        // import { CSSTransition, TransitionGroup } from "react-transition-group"