import { useState, useEffect } from "react";
import { checkPermissionsStatus } from "../utils/permissions";

export const usePermission = () => {
  const [permissions, setPermissions] = useState({
    camera: "prompt",
    microphone: "prompt",
  });

  useEffect(() => {
    checkPermissionsStatus().then(setPermissions);
  }, []);

  return permissions;
};

export default usePermission;
