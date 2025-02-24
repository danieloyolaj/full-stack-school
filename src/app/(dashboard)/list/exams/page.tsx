import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import {examsData, lessonsData, role, subjectsData, } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Exam ={
  id:number,
  subject:string;
  class:string;
  teacher:string;
  date:string;
  
}

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

const ExamsListPage = () => {

  //Showing all the rows
  const renderRow = (item:Exam) => (
    <tr key={item.id} className="border-b border-gray-200 ever:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/edit.png" alt="view-info" width={16} height={16} />
            </button>
          </Link> */}
          {/* This button below only shows if you are an admin */}
          {role === 'admin' && (
            <>
            <FormModal table="exam" type="update" id={item.id}/>
            <>
            <FormModal table="exam" type="delete" id={item.id}/>
          </>
            </>
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="view-info" width={16} height={16} />
            // </button>
          )

          }
        </div>
      </td>
    </tr>
  )
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="button" width={14} height={14}/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="button" width={14} height={14}/>
            </button>

            {role === 'admin' && (
              <>
              <FormModal table="exam" type="create"/>
              
            </>
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="button" width={14} height={14}/>
              // </button>
            )}
          </div>
        </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsData}/>
      
      {/* PAGINATION */}
      
        <Pagination />
      
    </div>
  )
}

export default ExamsListPage