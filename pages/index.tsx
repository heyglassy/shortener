import type { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { trpc } from "../utils/trpc";
import debounce from "lodash/debounce";
import copy from "copy-to-clipboard"
import { getUrl } from "../utils/url";

type Form = {
  alias: string;
  link: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<Form>({ alias: "", link: "" });

  const aliasCheck = trpc.useQuery(['alias-check', { name: form.alias }], { enabled: false })
  const createAlias = trpc.useMutation(['create-alias'])

  const input =
    "text-black mt-1 mb-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1";

  const dateInput = classNames(input, {
    "border-red-500": aliasCheck.isFetched && aliasCheck.data!.count > 0,
    "text-red-500": aliasCheck.isFetched && aliasCheck.data!.count > 0,
  });

  const url = getUrl()

  if (createAlias.status === 'success') {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-950 text-white">
        <div className="flex justify-center items-center">
          <h1>{`${url}/${form.alias}`}</h1>
          <input
            type="button"
            value="Copy Link"
            className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer ml-2"
            onClick={() => {
              copy(`${url}/link/${form.alias}`)
            }}
          />
        </div>
        <input
          type="button"
          value="Reset"
          className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer m-5"
          onClick={() => {
            createAlias.reset()
            setForm({ alias: "", link: "" })
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const encodedAlias = encodeURI(form.alias)
          createAlias.mutate({
            alias: encodedAlias,
            link: form.link
          })
        }}
        className="flex flex-col justify-center h-screen sm:w-2/3 md:w-1/2 lg:w-1/3"
      >
        <div className="flex items-center">
          <span className="font-medium mr-2">{url}/link/</span>
          <input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                alias: e.target.value,
              })
              debounce(aliasCheck.refetch, 100)
            }}
            minLength={1}
            placeholder="rothaniel"
            className={dateInput}
            value={form.alias}
            pattern={"^[-a-zA-Z0-9]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
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
              aliasCheck.refetch()
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
          disabled={aliasCheck.isFetched && aliasCheck.data!.count > 0}
        />
      </form>
    </div>
  );
};

export default Home;
