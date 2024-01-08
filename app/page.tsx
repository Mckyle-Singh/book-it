import Home from "@/components/Home"
import ErrorHandler from "@/backend/utils/errorHandler";

const getRooms = async () => {
  const res = await fetch("http://localhost:3000/api/rooms", {
    next: {
      tags: ["Rooms"],
    },
  });
  return res.json();
};

export default async function HomePage() {
  const rooms = await getRooms();
  return <Home />;
}
