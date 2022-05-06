import type { NextPage } from "next";
import { useState } from "react";
import type { Form } from "../types/form";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { trpc } from "../utils/trpc";
import debounce from "lodash/debounce";

const Home: NextPage = () => {
  const [form, setForm] = useState<Form>({ alias: "", link: "", valid: false });

  const input =
    "text-black mt-1 mb-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1";
  // const dateInput = classNames(input, {
  //   "border-red-500": !form.valid && parsedDate?.length > 0,
  //   "text-red-500": !form.valid && parsedDate?.length > 0,
  // });

  const res = trpc.useQuery(['alias-check', { name: form.alias }])
  if (res.isFetched) {
    console.log(res.data)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
      <form
        onSubmit={(e) => {
          // e.preventDefault();
          // form.valid && router.push(`/countdown/${createLink(form)}`);
        }}
        className="flex flex-col justify-center h-screen sm:w-2/3 md:w-1/2 lg:w-1/3"
      >
        <div className="flex items-center">
          <span className="font-medium mr-2">https://ping.gg/</span>
          <input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                alias: e.target.value,
              })
              debounce(res.refetch, 100)
            }}
            minLength={1}
            placeholder="theo"
            className={input}
            value={form.alias}
          />
          <input
            type="button"
            value="Random"
            className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer ml-2"
            onClick={() => {
              const alias = nanoid()
              setForm({
                ...form,
                alias: alias,
              })
              res.refetch()
            }}
          />
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Link</span>
          <input
            type="url"
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://google.com"
            required
            className={input}
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="rounded bg-pink-500 p-1 font-bold cursor-pointer mt-1"
        />
      </form>
    </div>
  );
};

export default Home;
