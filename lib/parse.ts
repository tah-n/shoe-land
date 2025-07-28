import Parse from 'parse';

function initParse() {
  if (typeof window === 'undefined') return;
  if (Parse.applicationId) return; 

  Parse.initialize(
    process.env.NEXT_PUBLIC_APP_ID!,
    process.env.NEXT_PUBLIC_JS_KEY!
  );
  Parse.serverURL = process.env.NEXT_PUBLIC_SERVER_URL!;
}

export default Parse;
export { initParse };