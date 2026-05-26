import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Todo List — Stay Organized" },
      { name: "description", content: "A simple, beautiful to-do list app. Add, complete, and remove tasks. Saved locally in your browser." },
    ],
  }),
  component: Index,
});

type Task = { id: string; text: string; completed: boolean };

const STORAGE_KEY = "todo.tasks.v1";

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks((t) => [{ id: crypto.randomUUID(), text, completed: false }, ...t]);
    setInput("");
  };

  const toggle = (id: string) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  const remove = (id: string) => setTasks((t) => t.filter((x) => x.id !== id));
  const clearCompleted = () => setTasks((t) => t.filter((x) => !x.completed));

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Today</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {remaining === 0 ? "All clear. Nice work." : `${remaining} task${remaining === 1 ? "" : "s"} remaining`}
          </p>
        </header>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs doing?"
            className="flex-1 rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition hover:border-ring/50"
            >
              <button
                onClick={() => toggle(task.id)}
                aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                  task.completed
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40 hover:border-primary"
                }`}
              >
                {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.completed ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => remove(task.id)}
                aria-label="Delete task"
                className="text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && hydrated && (
          <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No tasks yet. Add one above to get started.
          </div>
        )}

        {tasks.some((t) => t.completed) && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-xs text-muted-foreground transition hover:text-foreground"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
