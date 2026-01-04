import axios from "axios";

type NewsProps = {
    articles: Array<{
        id: number;
        title: string;
        content: string;
    }>;
}
// mặc định các component là SSG (Static Site Generation)
export default async function News(props: NewsProps) {
    const res = await fetch('http://localhost:3000/api/news', {
        cache: 'force-cache',// ssg static site generation lấy data từ cache
        // nếu trên local thì build lại mới có data mới
        // nếu trên real production thì phải build lại server mới có data mới
        // khi build file sẽ nằm tại thư mục .next/server/app/news.html
    });
    
    const data = await res.json();

    return (
        <div>
            <h1>Hello News {data.message}</h1>
        </div>
    )
}