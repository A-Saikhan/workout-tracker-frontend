import { Link } from "react-router";
import { useState } from 'react';
import type { ExercisePage } from "../types/exercise";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_URL;

function ExerciseList() {

  const[page, setPage] = useState(0);

  const {
    data,
    error,
    isError,
    isPending,
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: ["exercises", "list", { page }],
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/exercises?page=${page}&size=20`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return (await response.json()) as ExercisePage;
    },
  });
  
  
  if (isPending) return <p>Laden...</p>
  if (isError) return <p>Fehler: {error.message}</p>
  const listExercise = data.content.map(exercise =>
    <li key={exercise.id}>
      <Link to={`/exercises/${exercise.id}`}>
        <div className="flex flex-col p-3 bg-neutral-900 w-full rounded-2xl hover:bg-neutral-800 transition-colors border border-neutral-800">
          <h2 className="font-bold text-sm">{exercise.name}</h2>
          <p className="text-neutral-400 text-sm">{exercise.primaryMuscles[0]}</p>
        </div>
      </Link>
    </li>
  );


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 pt-3 pb-4 border-b border-neutral-800">
        <h1 className="font-bold text-2xl">Exercises</h1>
        {isFetching && <span className="text-sm text-neutral-500 text-right w-min-32">Lädt…</span>}
      </div>
      <ul className="flex flex-1 overflow-y-auto flex-col gap-1 bg-neutral-900 p-1">{listExercise}</ul>
      <div className="flex items-center justify-center gap-4 p-2 border-t border-neutral-800">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0 || isPlaceholderData} className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed min-w-24">Zurück</button>
        <span>Seite {page + 1} von {data.totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page >= data.totalPages - 1 || isPlaceholderData} className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed min-w-24">Weiter</button>
      </div>
    </div>
);
}
export default ExerciseList