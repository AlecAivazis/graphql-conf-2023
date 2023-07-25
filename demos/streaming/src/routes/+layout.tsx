import { LayoutProps } from "./$types";

export default function ({ Session, children }: LayoutProps) {
  if (!Session.viewer) {
    return redirect("/login");
  }

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
          src={Session.viewer?.profile?.source}
          height={50}
          width={50}
          className="rounded shadow-lg"
        />
      </nav>
      {children}
    </main>
  );
}
