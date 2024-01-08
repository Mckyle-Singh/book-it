
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/Room";

interface Props{
  data: {
    success: boolean,
    resPerPage: number,
    filteredRoomsCount: number,
    rooms: IRoom[]
  };
}

const Home = () => {
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          <RoomItem />
        </div>
      </section>
    </div>
  );
};

export default Home;