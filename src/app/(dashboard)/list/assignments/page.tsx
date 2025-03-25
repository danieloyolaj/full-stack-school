import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import {assignmentsData, role, } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Prisma, Subject, Class, Teacher, Assignment } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject,
    class: Class,
    teacher: Teacher,
  }
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
    header: "Due Date",
    accessor: "dueDate" ,
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

//Showing all the rows
const renderRow = (item:AssignmentList) => (
  <tr key={item.id} className="border-b border-gray-200 ever:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td className="hidden md:table-cell">{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        
        {/* This button below only shows if you are an admin */}
        {role === 'admin' && (
          <>
            <FormModal table="assignment" type="update" data={item}/>
            <FormModal table="assignment" type="delete" id={item.id}/>
          </>
          
        )

        }
      </div>
    </td>
  </tr>
)


const AssignmentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  //Here we're searching in the db and showing data
  const query: Prisma.AssignmentWhereInput = {};

  //This prevents a user to put any query
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = {classId: parseInt(value)};
            break;
          case "teacherId":
            query.lesson = {
              teacherId: value,
            };
            break;
          case "search":
            query.lesson = {
              subject: {
                name: {contains: value, mode: 'insensitive'},
              }
            }
            break;
          default:
            break;
        }
      }
    }
  }

  //Here we only select the columns of the tables needed
  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
          subject: {select: {name: true}},
          teacher: {select: {name: true}},
          class: {select: {name: true}},
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
              <FormModal table="assignment" type="create"/>
            )}
          </div>
        </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      
      {/* PAGINATION */}
      
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default AssignmentsListPage