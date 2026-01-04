import BlogPage from "@/views/blog";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const revalidate = 50; //tăng hiệu suất bằng cách cache data trong 50s
export default async function Blog() {
  let data: { posts: any[] } = { posts: [] };
  try {
    const res = await fetch(`${apiUrl}/blog`, {
      next: { revalidate }, //ssr server side rendering lấy data theo chu kỳ cứ sau 50s 1 lần gọi data
    });
    data = await res.json();
    console.log("Blog data:", data);
  } catch (err) {
    data = { posts: [] };
  }

  return (
    <div className="bg-teal-50 h-[calc(100vh)] p-10">
      {/* Client Comp */}
      <BlogPage data={data.posts} />
    </div>
  );
}
