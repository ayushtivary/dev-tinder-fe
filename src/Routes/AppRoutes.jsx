import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Body = lazy(() => import("../Components/Body"));
const Feed = lazy(() => import("../Components/Feed"));
const Login = lazy(() => import("../Components/Login"));
const Connections = lazy(() => import("../Components/Connections"));
const Profile = lazy(() => import("../Components/Profile"));
const Requests = lazy(() => import("../Components/Requests"));

const AppRoutes = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connection" element={<Connections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;