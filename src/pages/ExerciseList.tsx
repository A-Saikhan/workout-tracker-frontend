import { Link } from "react-router";
import { useState, useEffect } from 'react';
import type { Exercise, ExercisePage } from "../types/exercise";

const BASE_URL = import.meta.env.VITE_API_URL;

function ExerciseList() {
  const[data, setData] = useState<ExercisePage | null>(null);
  const[isLoading, setIsLoading] = useState(true);
  const[error, setError] = useState<Error | null>(null);
  const[page, setPage] = useState(0);
  const[size, setSize] = useState(20);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/exercises?page=${page}&size=${size}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);  
        const exercise = await response.json() as ExercisePage;
        setData(exercise);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();  
  },[page]);
  
  if (isLoading) return <p>Laden...</p>
  if (error) return <p>Fehler: {error.message}</p>
  if (!data) return null;
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
    <h1 className="font-bold text-2xl px-3 pt-3 pb-4 border-b border-neutral-800">Exercises</h1>
    <ul className="flex flex-1 overflow-y-auto flex-col gap-1 bg-neutral-900 p-1">{listExercise}</ul>
    <div className="flex items-center justify-center gap-4 p-2 border-t border-neutral-800">
      <button onClick={() => setPage(p => p - 1)} disabled={page === 0 || isLoading} className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed min-w-24">Zurück</button>
      <span>Seite {page + 1} von {data.totalPages}</span>
      <button onClick={() => setPage(p => p + 1)} disabled={page >= data.totalPages - 1 || isLoading} className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed min-w-24">Weiter</button>
    </div>
    </div>
);
}
export default ExerciseList