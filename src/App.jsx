import { useState } from "react";
import "./App.css";

const initialRoommates = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddRoommate, setShowAddRoommate] = useState(false);
  const [newRoommate, setNewRoommate] = useState(initialRoommates);
  const [showExpense, setShowExpense] = useState(null);

  function addNewRoommate(newRoommate) {
    setNewRoommate((roommates) => [...roommates, newRoommate]);
    setShowAddRoommate(false);
  }

  function toggleAddExpense(roommate) {
    setShowExpense((prev) => (prev?.id == roommate.id ? null : roommate));
    console.log(roommate);
  }
  return (
    <>
      <Header />
      <div className="grid grid-cols-2 gap-x-20 pt-10 px-[200px] items-start">
        <div className="flex flex-col gap-y-6">
          <Roommates
            roommates={newRoommate}
            onHandleToggleExpense={toggleAddExpense}
            showExpense={showExpense}
          />
          {showAddRoommate && (
            <AddNewRoommate onHandleNewRoommate={addNewRoommate} />
          )}
          <button
            onClick={() => setShowAddRoommate((prev) => !prev)}
            className="self-center border px-5 rounded-[5px] bg-[#487ac8] text-white font-bold border-[#487ac8] hover:bg-[#0043afee] duration-300 w-fit mt-2 cursor-pointer"
          >
            {showAddRoommate ? "Close" : "Add Roommate"}
          </button>
        </div>

        {showExpense && (
          <div className="border-[#bdc5d5] border rounded-[10px] p-1.5 px-5 py-2 flex flex-col gap-y-20">
            <AddExpense
              showExpense={showExpense}
              setNewRoommate={setNewRoommate}
              setShowExpense={setShowExpense}
            />
            <RecentExpenses newRoommate={newRoommate} />
          </div>
        )}
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className="bg-[#487ac8] text-white font-bold text-2xl p-0.5">
        <h2 className="text-center">Expense Tracker for Roommates</h2>
      </div>
    </>
  );
}

function Roommates({ roommates, onHandleToggleExpense, showExpense }) {
  return (
    <>
      <div className="border-[#bdc5d5] border rounded-[10px] p-1.5 w-fit px-5 py-2">
        <h1 className="font-bold">Roommates</h1>
        <p className="border w-full h-px border-[#3d383871]"></p>

        <div className="py-3 flex flex-col gap-y-3">
          {roommates.map((roommate) => (
            <Roommate
              roommate={roommate}
              key={roommate.id}
              onHandleToggleExpense={onHandleToggleExpense}
              showExpense={showExpense}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Roommate({ roommate, onHandleToggleExpense, showExpense }) {
  return (
    <>
      <div className="flex gap-x-5 gap-y-3 justify-between items-center hover:bg-[#4879c846] py-2 px-2 rounded-[5px] cursor-pointer">
        <div className="flex items-center gap-x-3">
          <img src={roommate.image} alt={roommate.name} />
          <div>
            <h1 className="font-bold">{roommate.name}</h1>
            {roommate.balance < 0 && (
              <p className="text-red-500 font-medium text-[14px]">
                You owe {roommate.name} ${Math.abs(roommate.balance)}
              </p>
            )}
            {roommate.balance > 0 && (
              <p className="text-green-500 font-medium text-[14px]">
                {roommate.name} owes you ${Math.abs(roommate.balance)}
              </p>
            )}
            {roommate.balance === 0 && (
              <p className="text-gray-500 font-medium text-[14px]">
                You and {roommate.name} are even ${Math.abs(roommate.balance)}
              </p>
            )}
          </div>
        </div>
        <Button onSmash={() => onHandleToggleExpense(roommate)}>
          {showExpense?.id === roommate.id ? "Close" : "Select"}
        </Button>
      </div>
    </>
  );
}

function Button({ children, onSmash }) {
  return (
    <>
      <button
        onClick={onSmash}
        className="border px-5 rounded-[5px] bg-[#487ac8] text-white font-bold border-[#487ac8] hover:bg-[#0043afee] duration-300"
      >
        {children}
      </button>
    </>
  );
}

function AddNewRoommate({ onHandleNewRoommate }) {
  const [roommateName, setRoommateName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmite(e) {
    e.preventDefault();
    if (!roommateName || !image) return;

    const id = crypto.randomUUID();

    const newRoommate = {
      name: roommateName,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    onHandleNewRoommate(newRoommate);
    setRoommateName("");
  }

  return (
    <>
      <div className="col-start-1 mt-10 border-[#bdc5d5] border rounded-[10px] p-1.5 w-fit px-5 py-2">
        <h1 className="font-bold">Add New Roommate</h1>
        <hr className="my-2" />
        <form onSubmit={handleSubmite}>
          <div className="flex items-center justify-between">
            <label htmlFor="">Name:</label>
            <input
              value={roommateName}
              onChange={(e) => setRoommateName(e.target.value)}
              type="text"
              className="border rounded-[4px] "
            />
          </div>

          <hr className="my-3 text-gray-300" />

          <div className="flex items-center justify-between gap-x-18">
            <label htmlFor="">Avatar URL:</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="border rounded-[4px] "
            />
          </div>

          <hr className="my-3 text-gray-300" />

          <Button>Add</Button>
        </form>
      </div>
    </>
  );
}

function AddExpense({ showExpense, setNewRoommate, setShowExpense }) {
  const [expenseName, setExpenseName] = useState("");
  const [bill, setBill] = useState("");
  const [paidby, setPaidby] = useState("user");

  function handleExpense(e) {
    e.preventDefault();

    if (!bill) return;

    const balance = paidby === "user" ? bill / 2 : -(bill / 2);

    setNewRoommate((prev) =>
      prev.map((roommate) =>
        roommate.id === showExpense.id
          ? { ...roommate, balance: roommate.balance + balance, paidby, bill }
          : roommate
      )
    );

    setBill("");
    setExpenseName("");
    setPaidby("user");
    setShowExpense(null);
  }
  return (
    <>
      <div>
        <h1 className="font-bold">Add Expense</h1>
        <hr />

        <form onSubmit={handleExpense} className="flex flex-col gap-y-5 mt-5">
          <div className="flex items-center justify-between">
            <label>Expense Name:</label>
            <input
              type="text"
              className="border rounded-[4px]"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Total Amount:</label>
            <input
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              type="number"
              className="border rounded-[4px]"
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Paid by:</label>
            <select
              className="border rounded-[4px]"
              value={paidby}
              onChange={(e) => setPaidby(e.target.value)}
            >
              <option value="user">You</option>
              <option value="roommate">{showExpense.name}</option>
            </select>
          </div>
          <div className="flex items-center justify-between font-bold">
            <label>With Roommate:</label>

            <input
              className="border rounded-[4px]"
              value={showExpense.name}
              disabled
            />
          </div>
          <Button>Add Expense</Button>
        </form>
      </div>
    </>
  );
}

function RecentExpenses({ newRoommate }) {
  return (
    <>
      <div>
        <h1 className="font-bold">Recent Expenses</h1>
        <hr className="my-2" />
        <ul className="list-disc mt-4">
          {newRoommate.map(
            (roommate) =>
              roommate.bill && (
                <>
                  {" "}
                  <li>
                    {roommate.paidby === "user" ? "You" : roommate.name} paid $
                    {roommate.bill} with{" "}
                    {roommate.paidby === "user" ? roommate.name : "you"}
                  </li>
                  <hr className="my-3 text-gray-300" />
                </>
              )
          )}
        </ul>
      </div>
    </>
  );
}
