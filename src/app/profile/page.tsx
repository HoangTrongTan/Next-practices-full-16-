import ChartBar from "@/views/profile";
import Image from "next/image";

const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

export default async function Profile() {
    const res = await fetch(`${apiUrl}/profile`, {
        'cache': 'no-store' //ssr server side rendering luôn lấy data mới nhất
    });
    const data = await res.json();
    
  return (
    <div className="bg-teal-50 min-h-screen w-full flex items-end justify-center pb-4">
      <div className="bg-white rounded-[7px] shadow-sm h-[calc(100vh-120px)] w-[calc(100vw-50px)] relative pt-15 pl-4 pr-4">
        <Image
          className="rounded-full absolute left-1/2 transform -translate-x-1/2 top-[-50px]"
          src={"/imgs/bg1.png"}
          alt="Profile Picture"
          width={150}
          height={150}
        />
        <div className="h-[100%] overflow-y-scroll pb-5 pt-2">
            <div className="grid grid-cols-3 auto-rows-[minmax(100px,_auto)] gap-2">
              <div className="col-start-1 col-end-2 row-start-1 bg-yellow-50 rounded-[7px]"></div>
              <div className="bg-pink-500/10 col-start-2 col-end-4 row-start-1 row-end-3 rounded-[7px]">
                <ChartBar />
              </div>
              <div className="bg-yellow-500/10 col-start-1 row-start-2 row-end-5 rounded-[7px] text-gray-500 p-2">
                    <h1 className="text-2xl font-semibold mb-2">Profile Info</h1>
                    <p><strong>Name:</strong> {data.details.name}</p>
                    <p><strong>Age:</strong> {data.details.age}</p>
                    <p><strong>Email:</strong> {data.details.email}</p>
                    <h1 className="text-2xl font-semibold mb-2">Skill</h1>
                    <ul>
                        {
                            data.details.skills.map((vl: any, i: any) => (
                                <li className="list-disc list-inside" key={i}>{vl}</li>
                            ))
                        }
                    </ul>
                </div>
              <div className="bg-red-500/50 col-start-3 row-start-3 row-end-4 rounded-[7px]"></div>
              <div className="bg-orange-500/30 col-start-3 row-start-4 row-end-5 rounded-[7px]"></div>
              <div className="bg-black/20 col-start-2 col-end-3 row-start-4 row-end-5 rounded-[7px]"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
