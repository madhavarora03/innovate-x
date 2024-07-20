import ImageSlider from "../components/ImageSlider";
import Latest from "../components/Latest";
const Home = () => {
  return (
    <>
      <div>
        <ImageSlider />
      </div>
      <div className="flex flex-col justify-center">
        <Latest />
      </div>
    </>
  );
};
export default Home;
