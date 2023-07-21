import React from "react";
import { gql, useQuery } from "urql";

// the main purpose of this component is to put the current session
// information in context
function Root({ children }: { children?: React.ReactNode }) {
  const [session] = useQuery({
    query: gql`
      query Session {
        viewer {
          id
          profile {
            source
          }
        }
      }
    `,
  });

  return (
    <SessionContext.Provider value={session.data}>
      {children}
    </SessionContext.Provider>
  );
}

const SessionContext = React.createContext<{
  viewer: { id: string; profile: { source: string } };
} | null>(null);

export const useSession = () => React.useContext(SessionContext);

export default Root;
