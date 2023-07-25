import { Link, isPending } from "$houdini";
import { PageProps } from "./$types";

export default function ({ ShowList }: PageProps) {
  return (
    <>
      <article className="flex flex-col w-100" style={{}}>
        <div className="flex flex-col gap-10">
          {ShowList.genres.edges.map(({ node: genre }, i) => (
            <div key={i} className="rounded-lg text-white pl-12">
              <h2 className="text-lg mb-4">
                {isPending(genre.name) ? (
                  <div className="pulsate h-5 w-14" />
                ) : (
                  genre.name
                )}
              </h2>
              <div className="flex flex-row gap-1">
                {genre.shows.edges.map(({ node: show }, i) => {
                  if (isPending(show)) {
                    return (
                      <Link
                        href="#"
                        className="pulsate"
                        style={{ width: 233, height: 130 }}
                        key={i}
                      >
                        <div className="pulsate" />
                      </Link>
                    );
                  }

                  return (
                    <Link
                      href={`/shows/${show.id}`}
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
        </div>
      </article>

      {!isPending(ShowList.suggestion) && (
        <aside
          className="billboard text-white absolute top-0 z-0"
          style={{
            backgroundImage: `url(${ShowList.suggestion.billboard.source})`,
          }}
        >
          <div className="absolute bottom-28 z-20 text-white pl-12 pb-10">
            <h1 className="text-2xl mb-4 text">{ShowList.suggestion.name}</h1>
            <h2 className="text-l max-w-lg text mb-4">
              {ShowList.suggestion.description}
            </h2>
            <div className="flex flex-row gap-4">
              <button className="rounded-lg billboard-button w-20 bg-white text-lg text-black">
                Play
              </button>
              <button
                className="rounded-lg billboard-button bg-button-transparent text-lg text-white "
                style={{ width: 125 }}
              >
                More Info
              </button>
            </div>
          </div>
          <div className="billboard-shade z-0" />
          <div className="billboard-bottom-vignette" />
        </aside>
      )}
    </>
  );
}
