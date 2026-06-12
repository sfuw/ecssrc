import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { mockGetMyInfo } from "../services/mockAuth";

const AuthenticationStore = createContainer(() => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [robux, setRobux] = useState(null);
  const [tix, setTix] = useState(null);
  const [notificationCount, setNotificationCount] = useState({
    messages: 0,
    trades: 0,
    friendRequests: 0,
  })

  useEffect(() => {
    mockGetMyInfo().then(result => {
      if (!result) {
        setIsPending(false);
        return;
      }
      setUserId(result.id);
      setUsername(result.name);
      setIsAuthenticated(true);
      setIsPending(false);
    }).catch(() => {
      setIsPending(false);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    // Backend unavailable — leave robux/tix/notifications at defaults
  }, [userId]);

  return {
    userId,
    username,
    isAuthenticated,
    isPending,

    robux,
    tix,

    notificationCount,
  }
});

export default AuthenticationStore;