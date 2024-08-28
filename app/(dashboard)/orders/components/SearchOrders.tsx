import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useStateContext } from "@/contexts/ContextProvider";
import { useState } from "react";
import { toast } from "sonner";




const SearchOrders = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [buttonLoad, setButtonLoad] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [details, setDetails] = useState({
    originHub: "",
    destinationHub: "",
    currentLocation: "",
    variant: "",
    paymentStatus: "",
    packageName: "",
    orderId: "",
    reference: "",
  })

  const {token} = useStateContext();

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // search for orders
  const searchOrders = async () => {
    setLoading(true)
    setButtonLoad(true)
    try {
      const options = {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({
          data: [
            {
              param: "origin_hub",
              value: details.originHub,
            },
            {
              param: "destination_hub",
              value: details.destinationHub,
            },
            {
              param: "current_location",
              value: details.currentLocation,
            },
            {
              param: "variant",
              value: details.variant,
            },
            {
              param: "payment_status",
              value: details.paymentStatus,
            },
            {
              param: "package_name",
              value: details.packageName,
            },
            {
              param: "order_id",
              value: details.orderId,
            },
            {
              param: "reference",
              value: details.reference,
            },
          ],
        }),
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/orders/find`,
        options
      )
      const data = await response.json()
      console.log(data)
      if (data.errors) {
        toast.error(data["message"])
        setButtonLoad(false)
        setDisabled(false)
      } else {
        setSearchData(data["data"])
        setShowSearch(true)
        setButtonLoad(false)
        setLoading(false)
        handleClose()
      }
    } catch (error) {
      console.log(error)
      setShowSearch(false)
    }
  }


  return (
    <div className="flex justify-end items-center mb-6">
      <Dialog>
        <DialogTrigger className="text-sm bg-[#E87000] text-white py-3 px-4 rounded-lg shadow-2xl">Search for orders</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm text-[#0D172B]">Are you absolutely sure?</DialogTitle>
            <DialogDescription>
            <div className="">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Origin Hub</label>
                        <input
                          type="text"
                          placeholder="Enter origin hub name"
                          value={details.originHub}
                          onChange={e => {
                            setDisabled(false)
                            setDetails({
                              ...details,
                              originHub: e.target.value,
                            })
                          }}
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Destination Hub</label>
                        <input
                          type="text"
                          placeholder="Enter destination hub name"
                          value={details.destinationHub}
                          onChange={e => {
                            setDisabled(false)
                            setDetails({
                              ...details,
                              destinationHub: e.target.value,
                            })
                          }}
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">
                          Current location
                        </label>
                        <select
                          className="form-select form-select-sm shadow-none"
                          aria-label=".form-select-sm example"
                          value={details.currentLocation}
                          onChange={e => {
                            let value =
                              e.target.value === "" ? null : e.target.value
                            setDisabled(false)
                            setDetails({
                              ...details,
                              currentLocation: e.target.value,
                            })
                          }}
                        >
                          <option value="">Select current location</option>
                          <option value="hub">Hub</option>
                          <option value="sender">Sender</option>
                          <option value="recipient">Recipient</option>
                          <option value="sweeper">Sweeper</option>
                          <option value="center">Center</option>
                          <option value="partner">Partner</option>
                        </select>
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Variant</label>
                        <select
                          className="form-select form-select-sm shadow-none"
                          aria-label=".form-select-sm example"
                          value={details.variant}
                          onChange={e => {
                            let value =
                              e.target.value === "" ? null : e.target.value
                            setDisabled(false)
                            setDetails({
                              ...details,
                              // variant: value,
                            })
                          }}
                        >
                          <option value="">Select Variant</option>
                          <option value="HUB_TO_HUB">Hub to hub</option>
                          <option value="HUB_TO_DOOR">Hub to door</option>
                          <option value="DOOR_TO_HUB">Door to hub</option>
                          <option value="DOOR_TO_DOOR">Door to door</option>
                        </select>
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Payment status</label>
                        <select
                          className="form-select form-select-sm shadow-none"
                          aria-label=".form-select-sm example"
                          value={details.paymentStatus}
                          onChange={e => {
                            let value =
                              e.target.value === "" ? null : e.target.value
                            setDisabled(false)
                            setDetails({
                              ...details,
                              paymentStatus: e.target.value,
                            })
                          }}
                        >
                          <option value="">Select Payment status</option>
                          <option value="completed">completed</option>
                          <option value="incompleted">incompleted</option>
                        </select>
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Package Name</label>
                        <input
                          type="text"
                          placeholder="Enter package name"
                          value={details.packageName}
                          onChange={e => {
                            setDisabled(false)
                            setDetails({
                              ...details,
                              packageName: e.target.value,
                            })
                          }}
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Order ID</label>
                        <input
                          type="text"
                          placeholder="Enter order ID"
                          value={details.orderId}
                          onChange={e => {
                            setDisabled(false)
                            setDetails({
                              ...details,
                              orderId: e.target.value,
                            })
                          }}
                        />
                        <small className="text-danger"></small>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-[#0D172B] font-medium mb-2">Reference</label>
                        <input
                          type="text"
                          placeholder="Enter package reference"
                          value={details.reference}
                          onChange={e => {
                            setDisabled(false)
                            setDetails({
                              ...details,
                              reference: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                </div>
                <div className="connect-footer">
                  <button
                    type="button"
                    className="connect-btn"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={disabled}
                    className={`connect-btn save-btn ${
                      buttonLoad && "opacity-50"
                    }`}
                    onClick={searchOrders}
                  >
                    {buttonLoad ? (
                      <div
                        className="spinner-border text-light mx-3"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchOrders;
