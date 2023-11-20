import { useState, useEffect } from "react";
//added react scroll to make explore button scroll to cars id
import { Link as ScrollLink } from "react-scroll";

// needed for redux
import { useDispatch, useSelector } from "react-redux";

// get cars
import { getCarAsync } from "../../reducers/carsSlice";
import {
  selectCars,
  selectError,
  selectIsLoading,
} from "../../reducers/carsSlice";

// singl car
import SingleCar from "../cars/SingleCar";
import { Link } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarAsync());
  }, []);

  const allCars = useSelector(selectCars);
  let cars = [...allCars];
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [sortOption, setSortOption] = useState("highestToLowest");
  if (sortOption === "highestToLowest") {
    cars.sort((a, b) => b.price - a.price);
  } else if (sortOption === "lowestToHighest") {
    cars.sort((a, b) => a.price - b.price);
  }else if(sortOption === "available"){
    cars = cars.filter((car) => car.availability === true)
  }

  return (
    <div className="container-xll text-center py-5">
      <h1 className="mb-5">Car lists</h1>
      {/* Sorting options UI */}
      <div className="mb-3 w-50 m-auto ">
        <label htmlFor="sortOption" className="form-label">
          Sort cars:
        </label>
        <select id="sortOption" className="form-select" value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="lowestToHighest">Lowest to Highest (price)</option>
          <option value="highestToLowest">Highest to Lowest (price)</option>
          <option value="available">Available (status)</option>
        </select>
      </div>

      <div className="row gap-3 gy-3 justify-content-center mx-0">
        {cars.map((car) => (
          <SingleCar
            key={car._id}
            name={car.name}
            model={car.model}
            availability={car.availability}
            price={car.price}
            id={car._id}
            page={"both"}
            image={car.imageUrl}
          />
        ))}

        
      </div>
    </div>
  );
};

export default Booking;
