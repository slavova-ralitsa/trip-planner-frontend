export const getFriendlyError = (statusCode, backendMessage) => {
  const errors = {
    "login-401": {
      title: "Wrong email or password",
      message: "The email or password you entered is incorrect. Please try again.",
      type: "auth"
    },
    400: {
      title: "Invalid Input",
      message: backendMessage || "Please check your information and try again.",
      type: "warning"
    },
    401: {
      title: "Session Expired",
      message: "For security reasons or because the profile does not exist, your session has been terminated. Please log in again.",
      actionLabel: "Go to Login Page",
      type: "auth"
    },
    403: {
      title: "Access Denied",
      message: "You do not have the necessary permissions to view this data.",
      type: "warning"
    },
    404: {
      title: "Route Not Found",
      message: "The trip or destination you are looking for does not exist or has been deleted.",
      type: "warning"
    },
    409: {
      title: "Account already exists",
      message: "An account with this email or username already exists. Try logging in instead.",
      actionLabel: "Go to Login Page",
      type: "warning"
    },
    500: {
      title: "Server Error",
      message: "We are currently experiencing a technical issue. Please try again in a few minutes.",
      type: "error"
    },
    503: {
      title: "Server Unavailable",
      message: "The Trip Planner server is currently unavailable or your internet connection may be interrupted. Please try again later.",
      type: "error"
    },
    mismatch: {
      title: "Passwords don't match",
      message: "Please make sure both password fields are identical.",
      type: "warning"
    }
  };

  return errors[statusCode] || {
    title: "An Unexpected Error Occurred",
    message: "Something went wrong. Please try again.",
    type: "error"
  };
};