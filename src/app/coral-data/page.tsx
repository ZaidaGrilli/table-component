import { CoralData, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

async function getCoralData(): Promise<CoralData[]> {
  const res = await fetch(
    'https://6622f3de3e17a3ac846e4fa7.mockapi.io/CoralData'
  )
  const data = await res.json()
  return data
}

export default async function Page() {
  const data = await getCoralData()

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-6 text-3xl font-bold'>All Tanks</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}