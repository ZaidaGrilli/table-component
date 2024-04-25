import { useEffect, useState } from "react";
import { CoralData } from "./app/coral-data/columns";
import { DataTable } from "@/components/ui/data-table";

async function getCoralData(): Promise<CoralData[]> {
  const res = await fetch(
    "https://6622f3de3e17a3ac846e4fa7.mockapi.io/CoralData"
  );
  const data = await res.json();
  return data;
}

export default function Page() {
  const [data, setData] = useState<CoralData[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      setData(await getCoralData());
    };
    fetchData()
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">All Data</h1>
        {data.length > 0 && <DataTable data={data} headers={{"created_at":"Created"}}/>}
      </div>
    </section>
  );
}
