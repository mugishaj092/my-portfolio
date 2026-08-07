import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center  font-sans container-app">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32  sm:items-start min-h-[200vh]">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center. jfhadpkfh;dsa fjdhfjkdashfl asd
          </p>
        </div>
      </main>
    </div>
  );
}
