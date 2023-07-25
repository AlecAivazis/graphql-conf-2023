import { Link } from "$houdini";

import { PageProps } from "./$types";

export default function ({ Session, ShowInfo }: PageProps) {
  return (
    <aside
      className="billboard text-white absolute top-0 z-0"
      style={{
        backgroundImage: `url(${ShowInfo.show?.billboard.source})`,
      }}
    >
      <div className="absolute bottom-28 z-20 text-white pl-12 pb-10">
        <h1 className="text-2xl mb-4 text">{ShowInfo.show?.name} </h1>
        <span style={{ color: "#46d369" }} className="text-lg">
          98% match
        </span>
        <h2 className="text-l max-w-lg text mb-4">
          {ShowInfo.show?.description}
        </h2>
      </div>
      <div className="billboard-shade z-0" />
      <div className="billboard-bottom-vignette" />
    </aside>
  );
}
