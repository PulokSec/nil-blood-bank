"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import Modal from "../reusable/Modal";
import { useFormik } from "formik";
import PreLoder from "../reusable/Preloder";
import InputType from "../reusable/InputType";
import BottomNavigationBar from "../reusable/BottomNavigationBar";
interface IDonarListForm {
  name: string;
  address: string;
  phone: string;
  bloodGroup: string;
  lastDonated?: string;
  weight?: string;
  vaccinated?: string;
}

const DonarListContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recordedData, setRecordedData] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBloodGroup, setNewBloodGroup] = useState("");
  const [newLastDonated, setNewLastDonated] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newVaccinated, setNewVaccinated] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
  const openModal = () => {
    setIsOpen(true);
    setSearchOpen(false);
  };
  const openSearchModal = () => {
    setSearchOpen(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchOpen(false);
  };
  const handleEdit = (itemId: any) => {
    setIsEditing(true);
    setEditingItemId(itemId);
    const currentItem = recordedData.find(
      (item: { _id: any }) => item._id === itemId
    );
    setNewName(currentItem.name);
    setNewBloodGroup(currentItem.bloodGroup);
    setNewAddress(currentItem.address);
    setNewPhone(currentItem.phone);
    setNewLastDonated(
      moment(currentItem.lastDonated).format("YYYY-MM-DDTHH:mm")
    );
    setNewWeight(currentItem.weight);
    setNewVaccinated(currentItem.vaccinated);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItemId(null);
  };
  const getDonarRecord = async () => {
    const response = await fetch("/api/donar/donar-list")
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok");
          setIsLoading(false);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setRecordedData((data as any).donarData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    getDonarRecord();
  }, []);

  const handleSearch = async (searchQuery: any, e: any) => {
    e.preventDefault();
    try {
      console.log(searchQuery);
      setLoading(true);
      const response = await fetch("/api/donar/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
        }),
      });

      if (!response.ok) {
        toast.error("Search request failed");
        setLoading(false);
        setSearchOpen(false);
        return;
      }
      const data = await response.json();
      console.log(data);
      setRecordedData(data?.result);
      setSearchOpen(false);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async (id: any, e: any) => {
    e.preventDefault();
    try {
      console.log(id);
      const updateData = {
        name: newName,
        address: newAddress,
        phone: newPhone,
        bloodGroup: newBloodGroup,
        lastDonated: newLastDonated,
        weight: newWeight,
        vaccinated: newVaccinated,
      };
      setLoading(true);
      const response = await fetch("/api/donar/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id, // Make sure to include the ID in the request body
          updatedField: updateData,
        }),
      });

      if (!response.ok) {
        toast.error("Update request failed");
        setLoading(false);
        setSearchOpen(false);
        return;
      }
      const data = await response.json();
      setIsEditing(false);
      setEditingItemId(null);
      toast.success(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      setDeletingItemId(id);
      setLoading(true);
      const response = await fetch("/api/donar/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        toast.error("Delete request failed");
        setLoading(false);
        return;
      }
      const data = await response.json();
      toast.success(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      bloodGroup: "",
      lastDonated: "",
      weight: "",
      vaccinated: "",
    },
    onSubmit: async (values: IDonarListForm, action) => {
      try {
        if (
          !values.name ||
          !values.bloodGroup ||
          !values.address ||
          !values.phone
        ) {
          toast.error("All field is required");
        } else {
          setIsLoading(true);
          /* ------------------------------ Post Api call ----------------------------- */
          const response = await fetch("/api/donar/add-donar", {
            method: "POST",
            body: JSON.stringify({
              name: values?.name,
              address: values?.address,
              phone: values?.phone,
              bloodGroup: values?.bloodGroup,
              lastDonated: values?.lastDonated,
              weight: values?.weight,
              vaccinated: values?.vaccinated,
              role: "donar",
            }),
            headers: { "content-type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                console.log("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.success === false) {
                toast.error(data.error);
                setIsLoading(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else if (data.success === true) {
                toast.success(data.message);
                setIsLoading(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
        }

        action.resetForm();
      } catch (error: any) {
        toast.error(error.response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
  });

  return (
    <div className="w-full md:w-[100vw] md:p-8 p-0">
      <div className="max-w-[90vw] lg:w-[65vw] overflow-x-scroll overflow-y-scroll  md:overflow-x-auto md:overflow-y-auto md:p-8 h-[80vh] ">
        <div className="md:flex items-center justify-between  hidden">
          <p
            className="px-6 py-3 text-left font-bold border border-1 shadow w-[140px] rounded cursor-pointer hover:bg-[#FF0000] hover:text-white"
            onClick={openModal}
          >
            Add Donar
          </p>
          <div className="w-[500px]">
            <form onSubmit={(e) => handleSearch(search, e)}>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={search}
                  id="default-search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Donors"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {isLoading ? (
          <div className=" min-h-[300px] flex justify-center items-center font-bold text-red-500">
            Loading...
          </div>
        ) : (
          <table className="min-w-full bg-white border rounded-lg overflow-hidden mt-5">
            <thead className="bg-gray-200">
              <tr className="text-gray-700">
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Donar Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Group
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Last Donated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Weight
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Vaccinated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-xs md:text-sm"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recordedData?.map((item: any) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        type="text"
                        className="border rounded p-1 w-full"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newBloodGroup}
                        onChange={(e) => setNewBloodGroup(e.target.value)}
                      />
                    ) : (
                      item.bloodGroup
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                      />
                    ) : (
                      item.address
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm cursor-pointer">
                    {isEditing && editingItemId === item._id ? (
                      // You might want to disable editing for phone number
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    ) : (
                      <a href={`tel:${item.phone}`} className="">
                        {item.phone}
                      </a>
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newLastDonated}
                        onChange={(e) => setNewLastDonated(e.target.value)}
                      />
                    ) : (
                      moment(item.lastDonated).format("DD/MM/YYYY hh:mm A")
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                      />
                    ) : (
                      item.weight
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      <input
                        className="border rounded p-1 w-full"
                        type="text"
                        value={newVaccinated}
                        onChange={(e) => setNewVaccinated(e.target.value)}
                      />
                    ) : (
                      item.vaccinated || "No"
                    )}
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    {isEditing && editingItemId === item._id ? (
                      // Render Save and Cancel buttons during editing
                      <>
                        <button
                          className="text-green-500"
                          onClick={(e) => handleUpdate(item._id, e)}
                        >
                          Save
                        </button>
                        <br />
                        <button
                          className="text-red-500"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      // Render Edit and Delete buttons when not editing
                      <>
                        <span
                          className="cursor-pointer text-blue-500 z-5"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </span>
                        /
                        <span
                          className="cursor-pointer text-red-500 z-5"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className=" flex items-center justify-center bg-base-200 flex-wrap">
            <form className="" onSubmit={handleSubmit}>
              <div className="bg-white mt-14 mb-14 p-8 rounded-md shadow-lg w-96 mx-5">
                <div className="mb-4">
                  <div className="flex text-[12px]">
                    <div className="w-96">
                      <div className="mb-3">
                        <InputType
                          labelTxt="Name"
                          inputType="text"
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {touched.name && errors.name ? (
                            <div>{errors.name}</div>
                          ) : null}
                        </p>
                      </div>

                      {/* /* ----------------------------- Select Blood Group ----------------------------- */}
                      <div className="mb-3">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-gray-700 font-bold mb-2 text-[12px]"
                        >
                          Blood Group
                        </label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          onChange={handleChange}
                          className="block w-full bg-white border focus:outline-none focus:border-pink-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:shadow-outline"
                        >
                          <option defaultValue={"Open this select menu"}>
                            Select a blood group
                          </option>
                          {bloodGroups.map((group, index) => (
                            <option key={index} value={group}>
                              {group}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <InputType
                          labelTxt="Address"
                          inputType="text"
                          id="address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {touched.address && errors.address ? (
                            <div>{errors.address}</div>
                          ) : null}
                        </p>
                      </div>

                      <div className="mb-3">
                        <InputType
                          labelTxt="Phone"
                          inputType="text"
                          id="phone"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {touched.phone && errors.phone ? (
                            <div>{errors.phone}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3">
                        <InputType
                          labelTxt="Last Donated"
                          inputType="text"
                          id="lastDonated"
                          name="lastDonated"
                          value={values.lastDonated}
                          onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {touched.lastDonated && errors.lastDonated ? (
                            <div>{errors.lastDonated}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3">
                        <InputType
                          labelTxt="Weight"
                          inputType="text"
                          id="weight"
                          name="weight"
                          value={values.weight}
                          onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {touched.weight && errors.weight ? (
                            <div>{errors.weight}</div>
                          ) : null}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-gray-700 font-bold mb-2 text-[12px]"
                        >
                          Vaccinated in Last 3 months
                        </label>
                        <select
                          id="vaccinated"
                          name="vaccinated"
                          onChange={handleChange}
                          className="block w-full bg-white border focus:border-pink-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option defaultValue={"Open this select menu"}>
                            Select an option
                          </option>

                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /* ------------------------------ Button Event ------------------------------ */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full text-[15px] bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded  focus:outline-none focus:ring focus:ring-pink-400"
                  >
                    {isLoading ? <PreLoder /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={searchOpen} onClose={closeModal} usingFor="search">
          <form
            className="block md:hidden h-full"
            onSubmit={(e) => handleSearch(search, e)}
          >
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Donors"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="fixed z-50">
        <BottomNavigationBar
          usingFor="donor"
          handleOpen={openModal}
          handleSearchOpen={openSearchModal}
        />
      </div>
    </div>
  );
};

export default DonarListContent;
