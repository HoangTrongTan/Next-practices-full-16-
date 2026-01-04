import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import blog from "@/db/blog.json";

const ok = {
  posts: [
    {
      id: 1,
      title: "Welcome to My Blog",
      content:
        "This is the first post on my blog. Stay tuned for more content!",
      author: "Admin",
      date: "2024-01-01",
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      content:
        "In this post, we will explore the concept of closures in JavaScript and how they work.",
      author: "Jane Doe",
      date: "2024-02-15",
    },
    {
      id: 3,
      title: "A Guide to Responsive Web Design",
      content:
        "Learn the principles of responsive web design to create websites that look great on any device.",
      author: "John Smith",
      date: "2024-03-10",
    },
  ],
};

export async function POST(request: Request) {
  const data = await request.json();
  const maxId = blog.posts.reduce((prev, curr) => {
    return curr.id + 1;
  }, 0);
  const filePath = path.join(process.cwd(), "src", "db", "blog.json");
  const date = new Date();
  const newData = [
    ...blog.posts,
    {
      id: maxId,
      ...data,
      date: date.toISOString().split("T")[0],
    },
  ];

  ok.posts = [
    ...ok.posts,
    {
      id: maxId,
      ...data,
      date: date.toISOString().split("T")[0],
    },
  ];

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      posts: newData,
    })
  );
  console.log("Added the new data to blog.json file");
  //   hàm POST phải return NEXT_RESPONSE nếu không sẽ báo lỗi
  return NextResponse.json({ message: "Blog saved successfully" });
}

export async function GET() {
  console.log("Fetching blog data...");
  return NextResponse.json(ok);
}
