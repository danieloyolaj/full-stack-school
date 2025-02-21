import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Class, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

//We create a type with all the tables needed to show the information
type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

//Showing all the rows
const renderRow = (item: TeacherList) => (
  <tr key={item.id} className="border-b border-gray-200 ever:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <Image
        src={`/${item.img}` || "/avatar.png"}
        alt="teacher"
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.username}
    </td>
    <td className="hidden md:table-cell">
      {item.subjects.map((subject) => subject.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((classItem: { name: any }) => classItem.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {item.phone}
    </td>
    <td className="hidden md:table-cell">
      {item.address}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="view-info" width={16} height={16} />
          </button>
        </Link>
        {/* This button below only shows if you are an admin */}
        {role === 'admin' && (
          //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          //   <Image src="/delete.png" alt="view-info" width={16} height={16} />
          // </button>
          <FormModal table="teacher" type="delete" id={item.id} />
        )

        }
      </div>
    </td>
  </tr>
)

//The searchParams will help me with pagination
const TeacherList = async ({
  searchParams,
}:{
  searchParams: { [key:string]: string | undefined }

  }) => {

    const {page, ...queryParams} = searchParams

    const p = page ? parseInt(page) : 1 //if the page exists assign to p the number, if it doesn't make it 1.

  //Fetching the data form the db
  const [data, count ] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true, //additional tables needed to show the teacher
        classes: true, //additional tables needed to show the teacher
      },
      take: ITEM_PER_PAGE, //This shows only 10 items per page
      skip: ITEM_PER_PAGE * (p - 1), //This is also for pagination
    }),
     prisma.teacher.count(), //Getting the total number of teachers
  ])
  
  console.log(count)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="button" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="button" width={14} height={14} />
            </button>
            {role === 'admin' && (
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}

      <Pagination page={p} count={count} />

    </div>
  )
}

export default TeacherList