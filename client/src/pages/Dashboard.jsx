import NavHeader from "../components/NavHeader";
import AddMovie from "../components/addMovie";
import CardContainer from "../components/cardContainer";

export default function DashboardPage() {
  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        <AddMovie />
      </div>
      <div className="container mx-auto pt-16 pb-16">
        <CardContainer edit={true} />
      </div>
    </>
  );
}
