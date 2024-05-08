import NavHeader from "../components/NavHeader";
import Banner from "../components/Banner";

export default function HomePage() {
  return (
    <>
      <NavHeader />
      <div className="container mx-auto pt-20">
        <Banner />
      </div>
    </>
  );
}
