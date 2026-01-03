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
  return (
    <>
      <Header />
      <div className="grid grid-cols-2 pt-10 px-[200px]">
        <Roommates />
      <button className="row-start-2 justify-self-center border px-5 rounded-[5px] bg-[#487ac8] text-white font-bold border-[#487ac8] hover:bg-[#0043afee] duration-300 w-fit mt-4 ">Add Roommate</button>
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

function Roommates() {
  return (
    <>
      <div className="border-[#bdc5d5] border rounded-[10px] p-1.5 w-fit px-5 py-2">
        <h1 className="font-bold">Roommates</h1>
        <p className="border w-full h-px border-[#3d383871]"></p>

        <div className="py-3 flex flex-col gap-y-3">
          {initialRoommates.map((roommate) => (
            <Roommate roommate={roommate} key={roommate.id} />
          ))}
        </div>
      </div>
    </>
  );
}

function Roommate({ roommate }) {
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
        <Button>Select</Button>
      </div>
    </>
  );
}

function Button({ children }) {
  return (
    <>
      <button className="border px-5 rounded-[5px] bg-[#487ac8] text-white font-bold border-[#487ac8] hover:bg-[#0043afee] duration-300">
        {children}
      </button>
    </>
  );
}
