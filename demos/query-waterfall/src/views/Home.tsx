import React from "react";
import { gql, useQuery } from "urql";
import { useSession } from "./Root";
import { Link } from "react-router-dom";

export default function () {
  return (
    <React.Suspense fallback={<LoadingState />}>
      <Home />
    </React.Suspense>
  );
}

function Home() {
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
        genres(delay: 2000) {
          edges {
            node {
              name
              shows {
                edges {
                  node {
                    id
                    name
                    billboard {
                      source
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return (
    <Layout
      header={
        <img
          src={session?.viewer?.profile?.source}
          height={50}
          width={50}
          className="rounded shadow-lg"
        />
      }
      grid={homeScreen.data?.genres.edges.map(({ node: genre }, i) => (
        <div key={i} className="rounded-lg text-white pl-12">
          <h2 className="text-lg mb-4">{genre.name}</h2>
          <div className="flex flex-row gap-1">
            {genre.shows.edges.map(({ node: show }) => {
              return (
                <Link
                  to={`/shows/${show.id}`}
                  style={{ width: 233, height: 130 }}
                  key={show.name}
                >
                  <img src={show.billboard.source} />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      banner={
        <aside
          className="billboard text-white absolute top-0 z-0"
          style={{
            backgroundImage: `url(${homeScreen.data?.suggestion.billboard.source})`,
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
      }
    />
  );
}

function LoadingState() {
  return (
    <Layout
      grid={Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-lg text-white pl-12">
          <h2 className="text-lg mb-4">
            <div className="pulsate h-5 w-14" />
          </h2>
          <div className="flex flex-row gap-1">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <Link
                  to="#"
                  className="pulsate"
                  style={{ width: 233, height: 130 }}
                  key={i}
                >
                  <div className="pulsate" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      header={<div className="pulsate h-5 w-14" />}
      banner={
        <aside className="billboard text-white absolute top-0 z-0 pulsate">
          <div className="absolute bottom-28 z-20 text-white pl-12 pb-10">
            <h1 className="text-2xl mb-4 text pulsate" />
            <h2 className="text-l max-w-lg text mb-4 pulsate" />
          </div>
          <div className="billboard-shade z-0" />
          <div className="billboard-bottom-vignette" />
        </aside>
      }
    />
  );
}

function Layout({
  grid,
  header,
  banner,
}: {
  grid: React.ReactNode;
  header: React.ReactNode;
  banner?: React.ReactNode;
}) {
  return (
    <main className="flex-col relative">
      <nav
        className="flex flex-row h-12 justify-end items-center pr-10 py-10 sticky top-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
        }}
      >
        {header}
      </nav>
      <div className="absolute z-10" style={{ top: "calc(56.25vw - 100px)" }}>
        <article className="flex flex-col w-100" style={{}}>
          <div className="flex flex-col gap-10">{grid}</div>
        </article>
      </div>
      {banner}
    </main>
  );
}
