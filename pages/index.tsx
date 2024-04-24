import { WithDefaultLayout } from '@/components/DefautLayout';
import { Page } from '@/types/Page';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

interface Customer {
  id: number;
  name: string;
}

const Queue: Page = () => {
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Emma'];
  const initialQueues: Customer[][] = [
    names.slice(0, 2).map((name, index) => ({ id: index, name })), //Slicing for the intial hardcode members.
    names.slice(2, 4).map((name, index) => ({ id: index + 2, name })),
    names.slice(4, 6).map((name, index) => ({ id: index + 4, name })),
  ];
  const [queues, setQueues] = useState<Customer[][]>(initialQueues);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if the name already exists in any of the queues
    if (queues.some(queue => queue.some(customer => customer.name === name))) {
      setError('No duplicate names are allowed!');
    } else {
      setError('');
    }
  }, [name, queues]);

  const handleAddToQueue = () => {
    if (error) {
      return;
    }
  
    const cashierIndex = Math.floor(Math.random() * 3); // Randomly select a cashier
    const newQueues = queues.map(queue => [...queue]); // Create a deep copy of the queues
    if (!newQueues[cashierIndex]) {
      newQueues[cashierIndex] = [];
    }
    newQueues[cashierIndex]!.push({ id: Date.now(), name });
    setQueues(newQueues);
    setName('');
  };
  
  const handleRemoveFromQueue = (cashierIndex: number) => { //removing from the queueu
    const newQueues = queues.map(queue => [...queue]);
    if (newQueues[cashierIndex] && newQueues[cashierIndex]!.length > 0) {
      newQueues[cashierIndex]!.shift();
      setQueues(newQueues);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Queue</h1>
        <div className="grid grid-cols-3 gap-4">
          {queues.map((queue, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <h2>Cashier #{index + 1}</h2>
              {queue.slice(0, 3).map((customer) => (
                <div key={customer.id} className="mt-2">
                  {customer.name}
                </div>
              ))}
              {queue.length > 3 && <p className="mt-2">{queue.length - 3} more people in the queue</p>}
            </div>
          ))}
        </div>
        <div className="mt-4 border border-gray-200 p-4 rounded-md grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-200 rounded px-4 py-2 mb-2"
              placeholder="Enter customer name"
            />
            {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
            <button
              onClick={handleAddToQueue}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enter Line
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleRemoveFromQueue(0)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Handle Cashier 1
            </button>
            <button
              onClick={() => handleRemoveFromQueue(1)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Handle Cashier 2
            </button>
            <button
              onClick={() => handleRemoveFromQueue(2)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Handle Cashier 3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Queue.layout = WithDefaultLayout;
export default Queue;
