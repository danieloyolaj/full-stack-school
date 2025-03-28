import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import {  role, subjectsData, } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type SubjectList = Subject & { teachers: Teacher[]}

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

//Showing all the rows
const renderRow = (item:SubjectList) => (
  <tr key={item.id} className="border-b border-gray-200 ever:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">
      {item.name}        
    </td>
    <td className="hidden md:table-cell">{item.teachers.map(teacher=>teacher.name).join(",")}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === 'admin' && (
      <>
          <FormModal table="subject" type="update" data={item}/>
          <FormModal table="subject" type="delete" id={item.id}/>
        </>
        )
        /* <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/edit.png" alt="view-info" width={16} height={16} />
          </button>
        </Link> */
        /* This button below only shows if you are an admin */
          
        //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
        //   <Image src="/delete.png" alt="view-info" width={16} height={16} />
        // </button>
        }
      </div>
    </td>
  </tr>
)

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.SubjectWhereInput = {};

  //This prevents a user to put any query
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  //This is where we find the subjects
  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
              <FormModal table="subject" type="create"/>

            </>
            //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            //   <Image src="/plus.png" alt="button" width={14} height={14}/>
            // </button>
            )}
          </div>
        </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      
      {/* PAGINATION */}
      
        <Pagination page={p} count={count} />
      
    </div>
  )
}

export default SubjectListPage