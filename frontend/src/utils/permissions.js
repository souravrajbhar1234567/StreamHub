export const requestMediaPermissions = async (video = true, audio = true) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
    return { granted: true, stream, error: null };
  } catch (error) {
    return { granted: false, stream: null, error: error.message };
  }
};

export const checkPermissionsStatus = async () => {
  try {
    if (!navigator.permissions) return { camera: "unknown", microphone: "unknown" };
    const camera = await navigator.permissions.query({ name: "camera" });
    const microphone = await navigator.permissions.query({ name: "microphone" });
    return {
      camera: camera.state,
      microphone: microphone.state,
    };
  } catch {
    return { camera: "prompt", microphone: "prompt" };
  }
};

export default { requestMediaPermissions, checkPermissionsStatus };
