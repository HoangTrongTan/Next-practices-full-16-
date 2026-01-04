"use client";

import { JSX, useReducer, useRef } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  data: {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
  }[];
};

const FIELDS = {
  TITLE: "title",
  CONTENT: "content",
  AUTHOR: "author",
};

const myPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve("200"), 1000));

const urlApi = process.env.NEXT_PUBLIC_API_URL;

const postBlog = async (title: any, content: any, author: any) => {
  try {
    await fetch(urlApi + "/blog", {
      body: JSON.stringify({ title, content, author }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("Error posting blog:", err);
  }
};

export default function BlogPage(props: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "increment":
          return { count: state.count + 1, incressment: state.incressment };
        case "decrement":
          return { count: state.count - 1, incressment: state.incressment };
        default:
          throw new Error();
      }
    },
    { count: 0, incressment: 1 }
  );
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get(FIELDS.TITLE);
    const content = formData.get(FIELDS.CONTENT);
    const author = formData.get(FIELDS.AUTHOR);
    await myPromise();
    await postBlog(title, content, author);
    form.current?.reset();
  };
  return (
    <div className="h-[calc(100vh-150px)] bg-white rounded-[7px] shadow-sm p-[10px]">
      <div className="grid grid-cols-2 gap-4 h-full">
        <form ref={form} action={handleSubmit}>
          <div className="flex items-center gap-1">
            <p className="w-[60px]">Title</p>
            <input
              className="p-[7px] outline-none border border-black rounded"
              type="text"
              name={FIELDS.TITLE}
            />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="w-[60px]">Content</p>
            <input
              className="p-[7px] outline-none border border-black rounded"
              type="text"
              name={FIELDS.CONTENT}
            />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="w-[60px]">Author</p>
            <input
              className="p-[7px] outline-none border border-black rounded"
              type="text"
              name={FIELDS.AUTHOR}
            />
          </div>
          <br />
          <Submit />
        </form>
        <div className="h-[calc(100vh-170px)]">
          {/* List blog */}
          <p className="">Blog list</p>
          <div className="overflow-y-scroll h-[calc(100%-40px)] p-5">
            {props.data.map((blog, index) => (
              <div
                key={index}
                className="rounded bg-white shadow-sm p-[5px] mt-1 pt-0"
              >
                <h2>📌{blog.title}</h2>
                <p>
                  <i>"{blog.content}"</i>
                </p>
                <h2>♻️{blog.author}</h2>
                <h2>📅{blog.date}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <div className="text-center">
      <button
        className="cursor-pointer transition-all duration-300 ease-linear bg-green-300 rounded-[5px] p-[5px] shadow-sm text-white hover:shadow-lg active:scale-90 active:shadow-sm"
        disabled={pending}
      >
        {pending ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
};

// delete this block
export function PageRender() {
  return (
    <div className="rounded-[5px] bg-red-300/50 shadow-sm grid">
      <ul className="flex items-center w-[calc(100vw-20px)]">
        <li className="grid border-radius h-full">1</li>
        <li className="text-center text-[#000] active:border-1 ">3</li>
      </ul>
    </div>
  );
}
