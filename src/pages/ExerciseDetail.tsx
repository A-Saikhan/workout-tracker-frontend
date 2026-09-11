import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import type { Exercise } from "../types/exercise";
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

function ExerciseDetail() {

    const[active, setActive] = useState("statistics")

    const { id } = useParams();

    const {
        data,
        error,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["exercises", "detail", id],
        staleTime: 5 * 60 * 1000, // change later after stats come in
        queryFn: async() => {
            const response = await fetch(`${BASE_URL}/exercises/${id}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return (await response.json()) as Exercise;
        },
    });

    if (isPending) return <p>Lade...</p>
    if (isError) return <p>Fehler: {error.message}</p>
    
    const details = [
        { label: "Level", value: data.level },
        { label: "Equipment", value: data.equipment },
        { label: "Category", value: data.category },
        { label: "Mechanic", value: data.mechanic },
        { label: "Force", value: data.force },
    ];

    const muscles = [
        { label: "Primary Muscles", value: data.primaryMuscles.join(", ") },
        { label: "Secondary Muscles", value: data.secondaryMuscles.join(", ")}
    ];

    const tabs = [
        { id: "statistics", label: "Statistics", content: "Your statistics will appear here once you've logged this exercise in a workout." },
        { id: "history", label: "History", content: "Later, you will see here when and with which weights you have trained this exercise." },
        { id: "workouts", label: "Workouts", content: "The workouts in which the exercise is included appear here." },
    ];

    const tabButtons = tabs.map((tab) => (
        <button 
        key={tab.id} onClick={() => setActive(tab.id)} className={`p-1 border-b-2
        ${active === tab.id ? "border-white text-white" : "border-transparent text-neutral-500"}`}>
            {tab.label}
        </button>
    ));

    const gridContainer = details.filter(d => d.value).map(detail =>
        <div key={detail.label}>
            <p className="text-xs text-neutral-500">{detail.label}</p>
            <p>{detail.value}</p>
        </div>
    );

    const muscleContainer = muscles.filter(d => d.value).map(muscle => 
        <div key={muscle.label}>
            <p className="text-xs text-neutral-500">{muscle.label}</p>
            <p>{muscle.value}</p>
        </div>
    );

    return (
        <>
            <h1 className="font-bold text-2xl border-b border-b-neutral-800 px-3 pt-3 pb-4">{data.name}</h1>
            <div className="max-w-2xl mx-3">
                <div className="bg-neutral-900 rounded-2xl my-2 p-4">
                    <div className="grid grid-cols-[auto_auto_auto] gap-x-4 gap-y-3">
                        {gridContainer}
                    </div>
                    <div className="space-y-3 border-t border-neutral-700 mt-4 pt-4">
                        {muscleContainer}
                    </div>
                </div>
                <details className="bg-neutral-900 rounded-2xl p-4 mb-2">
                    <summary className="font-bold cursor-pointer">Instructions</summary>
                    <ol className="list-decimal list-inside space-y-2 mt-3">
                        {data.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                            ))}
                    </ol>
                </details>
                <div className="bg-neutral-900 rounded-2xl my-2 p-4">
                    <div className="flex justify-around">
                        {tabButtons}
                    </div>
                    <div className="mt-4 text-sm text-neutral-500">
                        {tabs.find(t => t.id === active)?.content}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExerciseDetail