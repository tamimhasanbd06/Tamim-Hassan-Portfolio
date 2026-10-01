export type SupportedErrorStatus =
  | 400 | 401 | 403 | 404 | 408 | 409 | 410 | 413 | 415 | 422 | 429 | 500 | 502 | 503 | 504;

export type ErrorAction = "home" | "back" | "retry" | "login" | "review";

export type ErrorPresentation = {
  statusCode: SupportedErrorStatus;
  eyebrow: string;
  title: string;
  message: string;
  primaryAction: ErrorAction;
  secondaryAction?: ErrorAction;
};

export const errorConfig: Record<SupportedErrorStatus, ErrorPresentation> = {
  400: { statusCode: 400, eyebrow: "Bad Request", title: "We Couldn’t Read That Request", message: "Some information in the request was not valid. Review it and try again.", primaryAction: "review", secondaryAction: "home" },
  401: { statusCode: 401, eyebrow: "Authentication Required", title: "Sign In to Continue", message: "This area is protected. Use the existing sign-in flow to continue securely.", primaryAction: "login", secondaryAction: "home" },
  403: { statusCode: 403, eyebrow: "Access Denied", title: "You Don’t Have Access", message: "You are signed in, but this destination is not available to this session.", primaryAction: "back", secondaryAction: "home" },
  404: { statusCode: 404, eyebrow: "Page Not Found", title: "This Page Is Lost in Digital Space", message: "The page you are looking for may have been moved, deleted, renamed, or never existed.", primaryAction: "home", secondaryAction: "back" },
  408: { statusCode: 408, eyebrow: "Request Timeout", title: "That Took Too Long", message: "The request timed out before it could finish. Check your connection and try again.", primaryAction: "retry", secondaryAction: "home" },
  409: { statusCode: 409, eyebrow: "Conflict", title: "This Change Conflicts With Newer Data", message: "The information changed while you were working. Refresh or review the latest state before trying again.", primaryAction: "retry", secondaryAction: "back" },
  410: { statusCode: 410, eyebrow: "Gone", title: "This Content Is No Longer Available", message: "The requested content has been intentionally removed and is no longer available here.", primaryAction: "home", secondaryAction: "back" },
  413: { statusCode: 413, eyebrow: "Content Too Large", title: "That File Is Too Large", message: "Choose a smaller file and try again.", primaryAction: "review", secondaryAction: "back" },
  415: { statusCode: 415, eyebrow: "Unsupported Media Type", title: "That File Type Isn’t Supported", message: "Choose a supported file format and try again.", primaryAction: "review", secondaryAction: "back" },
  422: { statusCode: 422, eyebrow: "Unprocessable Content", title: "Some Information Needs Attention", message: "The request was understood, but one or more fields need to be corrected.", primaryAction: "review", secondaryAction: "back" },
  429: { statusCode: 429, eyebrow: "Too Many Requests", title: "Please Try Again Shortly", message: "Too many requests were received in a short period. Wait for the server’s retry window before trying again.", primaryAction: "retry", secondaryAction: "home" },
  500: { statusCode: 500, eyebrow: "Server Error", title: "Something Went Wrong", message: "We couldn’t complete your request right now. Please try again or return to the homepage.", primaryAction: "retry", secondaryAction: "home" },
  502: { statusCode: 502, eyebrow: "Bad Gateway", title: "A Service Didn’t Respond Correctly", message: "A connected service returned an invalid response. Please try again shortly.", primaryAction: "retry", secondaryAction: "home" },
  503: { statusCode: 503, eyebrow: "Service Unavailable", title: "The Site Is Temporarily Unavailable", message: "The service is temporarily unavailable or under maintenance. Please try again shortly.", primaryAction: "retry", secondaryAction: "home" },
  504: { statusCode: 504, eyebrow: "Gateway Timeout", title: "A Service Took Too Long", message: "A connected service did not respond in time. Please try again shortly.", primaryAction: "retry", secondaryAction: "home" },
};

export function getErrorPresentation(status?: number): ErrorPresentation {
  return errorConfig[(status && status in errorConfig ? status : 500) as SupportedErrorStatus];
}
