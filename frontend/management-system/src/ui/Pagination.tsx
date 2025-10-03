import { current } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalPosts?: number;
  postsPerPage?: number;
  currentPage?: number;
  currentPageSet?: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [previousDisabled, setPreviousDisabled] = useState<Boolean>(false)
  useEffect(() => {
    const pageNumbers: number[] = [];
    if (props.totalPosts && props.postsPerPage) {
      for (
        let i = 1;
        i <= Math.ceil(props.totalPosts / props.postsPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }
    }
    setPageNumbers(pageNumbers);
  }, [props.postsPerPage, props.totalPosts]);


  // useEffect(() => {
  //   if (props.currentPage && props.currentPage < 1) {
  //     setPreviousDisabled(true)
  //   } else {
  //     setPreviousDisabled(false)
  //   }
  // })

  const nextPage = () => {
    if (props.currentPage && props.currentPage < pageNumbers.length) {
        props.currentPageSet && props.currentPageSet(props.currentPage + 1);
    }
  };
  const previousPage = () => {
    if (props.currentPage && props.currentPage > 1) {
        props.currentPageSet && props.currentPageSet(props.currentPage - 1);
        setPreviousDisabled(false)
    }
  };
  return (
    <div className="flex gap-[18px]">
      <button className={`${previousDisabled && "opacity-50"} buttonColor px-4 py-3.5 rounded-[10px] text-xl text-white font-medium font-poppins`} onClick={previousPage}>Previous</button>
      <div className="flex gap-2">
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => props.currentPageSet && props.currentPageSet(number)}
          
          className={` ${props.currentPage === number ? "bg-white px-2 py-2 rounded-[15px] text-xl font-medium text-black w-[50px] h-[50px]" : "bg-[#283573] w-[50px] h-[50px] px-2 py-2 rounded-[15px] text-xl font-medium text-white"}`}
        >
          {number}
        </button>
      ))}
      </div>
      <button className="buttonColor px-4 py-3.5 rounded-[10px] text-xl text-white font-medium font-poppins" onClick={nextPage}>Next</button>
    </div>
  );
}
