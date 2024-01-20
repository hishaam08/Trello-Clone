"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggestion";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<any[]>([]);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    setTimeout(() => {
      fetchSuggestionFunc();
    }, 3000);
  }, [board]);

  return (
    <header>
      <div className="flex flex-col items-center p-5 md:flex-row rounded-b-2xl">
        <div className="absolute top-0 left-0 h-96 w-full bg-gradient-to-br from-pink-400 via-slate-[#0055D1] to-[#005] rounded-b-md -z-50 opacity-50 blur-3xl" />
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello logo"
          width={300}
          height={100}
          className="object-contain pb-10 w-44 md:w-56 md:pb-0"
        />
        <div className="flex items-center justify-end flex-1 w-full space-x-5">
          {/* Search */}
          <form className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* Avatar */}
          {/* <Avatar name="Hishaam" round size="50" color="#0055D1" /> */}
        </div>
      </div>
      <div className="flex justify-center px-5 py-2 md:py-5">
        <p className="bg-white rounded-md shadow-md p-2 text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion.length !== 0
            ? `You have ${
                suggestion[0] === 1
                  ? "1 task to do"
                  : `${suggestion[0]} tasks to do`
              }, ${
                suggestion[1] === 1
                  ? "1 task in progress"
                  : `${suggestion[1]} tasks in progress `
              } and ${
                suggestion[2] === 1
                  ? "1 task done"
                  : `${suggestion[2]} tasks done`
              }`
            : "We are summarising your tasks for the day"}
          {/* {suggestion && !loading
            ? suggestion
            : "GPT is summerising your tasks..."} */}
        </p>
      </div>
    </header>
  );
}

export default Header;
