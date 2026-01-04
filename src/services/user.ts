"use server";

import { cacheLife, cacheTag, revalidateTag } from "next/cache";

const getUser = async () => {
  const data = (await fetch("http://example.com")).json();
  cacheTag("userDetails");
  cacheLife({ stale: 60 })
  return data;
};

const updateUser = async () => {
  await fetch("http://example.com", {
    method: "POST",
    body: JSON.stringify({}),
  });
  revalidateTag("userDetails", { expire: 0 });
};
