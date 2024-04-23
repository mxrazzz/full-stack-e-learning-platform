// Basic Contact Us Page
// Fully reused from https://mambaui.com/components/contact
// Validation done by AI, as this page is not a main component, so to save time used AI
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const ContactUs = () => {
  //AI generated validation
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    details: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.firstname.trim()) errors.firstname = "First name is required";
    if (!formData.lastname.trim()) errors.lastname = "Last name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!regex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.details.trim()) errors.details = "Details are required";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    //sending successful if all form fields filled out
    if (Object.keys(errors).length === 0) {
      dispatch(showNotification({ message: "Inquiry sent successfully." }));
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        details: "",
      }); // clearing form
    } else {
      setFormErrors(errors);
    }
  };

  //fully reused by Mamba UI, with slight changes by me and AI
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-[#FFF7E0] text-[#5C3D2E]">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-1">We'd love to talk about how we can help you.</p>
        </div>

        <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 border-[#BFA76F]">
            <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstname" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      placeholder="First Name"
                      className="py-3 px-4 block w-full rounded-lg text-sm border-[#D4AF37] focus:border-[#C9A567] focus:ring-[#C9A567]"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    {formErrors.firstname && (
                      <p className="text-red-500 text-xs">
                        {formErrors.firstname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastname" className="sr-only">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Last Name"
                      className="py-3 px-4 block w-full rounded-lg text-sm border-[#D4AF37] focus:border-[#C9A567] focus:ring-[#C9A567]"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    {formErrors.lastname && (
                      <p className="text-red-500 text-xs">
                        {formErrors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="py-3 px-4 block w-full rounded-lg text-sm border-[#D4AF37] focus:border-[#C9A567] focus:ring-[#C9A567]"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="details" className="sr-only">
                    Details
                  </label>
                  <textarea
                    id="details"
                    rows="4"
                    placeholder="Details"
                    className="py-3 px-4 block w-full rounded-lg text-sm border-[#D4AF37] focus:border-[#C9A567] focus:ring-[#C9A567]"
                    value={formData.details}
                    onChange={handleChange}
                  ></textarea>
                  {formErrors.details && (
                    <p className="text-red-500 text-xs">{formErrors.details}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center text-sm font-semibold rounded-lg bg-[#C9A567] text-[#5C3D2E] hover:bg-[#BFA76F]"
                >
                  Send Inquiry
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm">Responses can take 3-5 business days</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
