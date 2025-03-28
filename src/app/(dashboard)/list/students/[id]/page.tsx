"use client"
import Announcements from "@/components/Announcements"
import Performance from "@/components/Performance"
import BigCalendar from "@/components/BigCalendar"
import Image from "next/image"
import Link from "next/link"

const SingleStudentPage = () => {
  return(
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
      
      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* USER INFO CARD */}
        <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
          <div className="w-1/3">
            <Image src="/neo.jpg" alt="user-image" width={144} height={144} className="w-36 h-36 rounded-full object-cover" />
          </div>
          <div className="w-2/3 flex flex-col justify-between gap-4">
            <h1 className="text-xl font-semibold">Jhon Anderson</h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <Image src="/blood.png" alt="blood-type" width={14} height={14} />
                <span>A+</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <Image src="/date.png" alt="blood-type" width={14} height={14} />
                <span>January 2025</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <Image src="/mail.png" alt="blood-type" width={14} height={14} />
                <span>neo@matrix.com</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <Image src="/phone.png" alt="blood-type" width={14} height={14} />
                <span>+591 78924589</span>
              </div>
            </div>
          </div>
        </div> 

        {/* SMALL CARDS */}
        <div className="flex-1 flex gap-4 justify-between flex-wrap">
          {/* CARD  */}
          <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <Image src="/singleAttendance.png" alt="attendance" width={24} height={24} className="w-6 h-6"/>
            <div className="">
              <h1 className="text-xl font-semibold">7th</h1>
              <span className="text-sm text-gray-400">Grade</span>
            </div>
          </div>
          {/* CARD  */}
          <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <Image src="/singleBranch.png" alt="attendance" width={24} height={24} className="w-6 h-6"/>
            <div className="">
              <h1 className="text-xl font-semibold">95%</h1>
              <span className="text-sm text-gray-400">Attendance</span>
            </div>
          </div>
          {/* CARD  */}
          <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <Image src="/singleLesson.png" alt="attendance" width={24} height={24} className="w-6 h-6"/>
            <div className="">
              <h1 className="text-xl font-semibold">18</h1>
              <span className="text-sm text-gray-400">Lessons</span>
            </div>
          </div>
          {/* CARD  */}
          <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <Image src="/singleClass.png" alt="attendance" width={24} height={24} className="w-6 h-6"/>
            <div className="">
              <h1 className="text-xl font-semibold">7C</h1>
              <span className="text-sm text-gray-400">Class</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM  */}
      <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
        <h1 className="text-2xl font-semibold mb-4">Student&apos;s Schedule</h1>
        <BigCalendar />
      </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shorcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link href={`/list/lessons?classId=${2}`} className="p-3 rounded-md bg-lamaSky">Student&apos;s Lessons</Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/list/teachers?classId=${2}`}>Student&apos;s Teachers</Link>
            <Link href={`/list/exams?classId=${2}`} className="p-3 rounded-md bg-lamaSkyLight">Student&apos;s Exams</Link>
            <Link href={`/list/assignments?classId=${2}`} className="p-3 rounded-md bg-lamaYellowLight">Student&apos;s Assignments</Link>
            <Link href={`/list/results?studentId=${"student2"}`} className="p-3 rounded-md bg-lamaYellowLight">Student&apos;s Results</Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>

    </div>
  )
}

export default SingleStudentPage