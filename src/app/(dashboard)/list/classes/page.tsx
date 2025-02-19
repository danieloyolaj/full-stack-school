import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import {  classesData, role, subjectsData, } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Class ={
  id:number,
  name:string;
  capacity:string;
  grade:string;
  supervisor:string;
  
}

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

const ClassListPage = () => {

  //Showing all the rows
  const renderRow = (item:Class) => (
    <tr key={item.id} className="border-b border-gray-200 ever:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* This button below only shows if you are an admin */}
          {role === 'admin' && (
            <>
              <FormModal table="class" type="update" data={item}/>
              <FormModal table="class" type="delete" id={item.id}/>
            </>
          //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
              <FormModal table="class" type="create"/>
              
            //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            //   <Image src="/plus.png" alt="button" width={14} height={14}/>
            // </button>
            )}
          </div>
        </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData}/>
      
      {/* PAGINATION */}
      
        <Pagination />
      
    </div>
  )
}

export default ClassListPage