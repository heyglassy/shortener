import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-gray-950 text-white">
      <h1 className="mr-2 font-bold">404: </h1>
      <Link href="/">
        <a className="rounded bg-pink-500 p-1 font-bold text-white">
          Return to home
        </a>
      </Link>
    </div>
  );
};

export default PageNotFound;
