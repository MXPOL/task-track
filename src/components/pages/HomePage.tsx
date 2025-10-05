import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="border-b border-secondary/20">
        <div className="max-w-[120rem] mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <div className="font-heading text-xl font-bold tracking-wider">
              TASKFLOW
            </div>
            <div className="flex items-center gap-8">
              <span className="font-paragraph text-sm">
                {completedCount} of {totalCount} completed
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Split Layout Inspired by Image */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[60vh]">
          {/* Left Side - Large Typography */}
          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-6xl lg:text-8xl font-bold tracking-wider uppercase leading-tight mb-8">
              TASK
              <br />
              MANAGEMENT
            </h1>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new task..."
                  className="flex-1 bg-secondary text-secondary-foreground border-0 h-12 text-lg font-paragraph"
                />
                <Button
                  onClick={addTask}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-6"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Description and Stats */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p className="font-paragraph text-lg leading-relaxed">
                Streamline your productivity with our minimalist task management system. 
                Add, complete, and remove tasks with elegant simplicity.
              </p>
              <p className="font-paragraph text-base opacity-80">
                Focus on what matters most. Clean design meets powerful functionality 
                in this distraction-free environment.
              </p>
            </div>
            
            {totalCount > 0 && (
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-secondary/10 border-secondary/20 p-6">
                  <div className="text-center">
                    <div className="font-heading text-3xl font-bold text-primary-foreground mb-2">
                      {totalCount}
                    </div>
                    <div className="font-paragraph text-sm opacity-80">
                      Total Tasks
                    </div>
                  </div>
                </Card>
                <Card className="bg-secondary/10 border-secondary/20 p-6">
                  <div className="text-center">
                    <div className="font-heading text-3xl font-bold text-primary-foreground mb-2">
                      {completedCount}
                    </div>
                    <div className="font-paragraph text-sm opacity-80">
                      Completed
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tasks Section */}
      {tasks.length > 0 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 pb-16">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold tracking-wider uppercase mb-8">
              Your Tasks
            </h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="bg-secondary/5 border-secondary/20 p-4 hover:bg-secondary/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-primary-foreground hover:text-secondary transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    <span
                      className={`flex-1 font-paragraph text-lg ${
                        task.completed
                          ? 'line-through opacity-60'
                          : ''
                      }`}
                    >
                      {task.text}
                    </span>
                    <Button
                      onClick={() => removeTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="text-primary-foreground hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 pb-16">
          <div className="text-center py-16">
            <div className="opacity-40 mb-6">
              <Circle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="font-heading text-xl font-bold tracking-wider uppercase mb-4">
              No Tasks Yet
            </h3>
            <p className="font-paragraph text-base opacity-60">
              Add your first task above to get started
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-secondary/20 mt-16">
        <div className="max-w-[120rem] mx-auto px-6 py-8">
          <div className="text-center">
            <p className="font-paragraph text-sm opacity-60">
              Built with focus and simplicity in mind
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}