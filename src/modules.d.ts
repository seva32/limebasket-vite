declare module "lime";
declare module "yup";
declare module "lodash.isempty";

interface Window {
  gapi: typeof gapi & {
    auth2: { getAuthInstance: () => { signOut: Promise; disconnect: Promise } };
  };
}
