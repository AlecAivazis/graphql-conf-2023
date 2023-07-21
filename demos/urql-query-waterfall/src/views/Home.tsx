import { gql, useQuery } from "urql";
import { useSession } from "./Root";

function Home({ children }: { children?: React.ReactNode }) {
  const session = useSession();

  const [homeScreen] = useQuery({
    query: gql`
      query HomeScreen {
        suggestion {
          id
          name
          description
          billboard {
            source
          }
        }
      }
    `,
  });

  return (
    <main className="flex-col relative">
      <nav
        className="flex flex-row h-12 justify-end items-center pr-10 py-10 sticky top-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
        }}
      >
        <img
          src={session?.viewer?.profile?.source}
          height={50}
          width={50}
          className="rounded shadow-lg"
        />
      </nav>
      <div className="absolute z-10" style={{ top: "calc(56.25vw - 100px)" }}>
        <article className="flex flex-col w-100" style={{}}>
          {children}
        </article>
      </div>

      <aside
        className="billboard text-white absolute top-0 z-0"
        style={{
          backgroundImage: `url(${homeScreen.data.suggestion.billboard.source})`,
        }}
      >
        <div className="absolute bottom-28 z-20 text-white pl-12 pb-10">
          <h1 className="text-2xl mb-4 text">
            {homeScreen.data.suggestion.name}
          </h1>
          <h2 className="text-l max-w-lg text mb-4">
            {homeScreen.data.suggestion.description}
          </h2>
          <div className="flex flex-row gap-4">
            <button className="rounded-lg billboard-button w-20 bg-white text-lg text-black">
              Play
            </button>
            <a
              href={`/shows/${homeScreen.data.suggestion.id}`}
              className="rounded-lg billboard-button bg-button-transparent text-lg text-white "
              style={{ width: 125 }}
            >
              More Info
            </a>
          </div>
        </div>
        <div className="billboard-shade z-0" />
        <div className="billboard-bottom-vignette" />
      </aside>
    </main>
  );
}

export default Home;
