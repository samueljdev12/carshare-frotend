import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCar,
  selectIsLoading,
  selectError,
  selectNewCar,
} from "../../reducers/carsSlice";
import { selectIsAuthenticated } from "../../reducers/authSlice";

const AddCar = () => {
  const dispatch = useDispatch();
  // selectors
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = localStorage.getItem("role")


  // Set form data and validation errors
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    model: "",
    price: "",
    imageUrl: ""
  });

  // Handle changes in form data
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors for this field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate form data before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.name.trim() === "") {
      newErrors.name = "Car Name is required.";
      isValid = false;
    }

    if (formData.model.trim() === "") {
      newErrors.model = "Model is required.";
      isValid = false;
    }

    if (formData.price.trim() === "") {
      newErrors.price = "Price is required.";
      isValid = false;
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid number greater than 0.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform form submission if the form is valid
      dispatch(createCar(formData));
      // Clear the form after submission (if needed)
      setFormData({
        name: "",
        model: "",
        price: "",
        imageUrl: ""
      });
    }
  };

  const { name, model, price, imageUrl } = formData;

  if (!isAuthenticated || role !== "staff") {
    return (
      <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
         You are not Authorized to access this page
      </div>
    );
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      {/* spinner */}
      {isLoading && (
        <div className="overlay">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h5>Adding car...</h5>
        </div>
      )}
      {/* spinner end */}
      <div className="container">
        <div className="row justify-content-center">
          {error && (
            <div className="col-12">
              <h6 className="text-center text-danger ">
                There was an error while adding car try again
              </h6>
            </div>
          )}
          <div className="col-md-6">
            <form onSubmit={onSubmit}>
              {/* ... Your form fields ... */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Car Name:
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                />
                <div className="text-danger">{errors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="model" className="form-label">
                  Model:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  name="model"
                  placeholder="Enter model"
                  value={model}
                  onChange={onChange}
                />
                <div className="text-danger">{errors.model}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={onChange}
                />
                <div className="text-danger">{errors.price}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image Url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Enter image Url"
                  value={imageUrl}
                  onChange={onChange}
                />
                <div className="text-danger">{errors.imageUrl}</div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success btn-lg w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
