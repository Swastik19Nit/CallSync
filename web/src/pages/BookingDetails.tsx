import { useNavigate, useParams } from "react-router-dom";
import { useBookingDetailsQuery } from "../slices/bookingApiSlice";
import getMeetingTimeStatus from "../Hooks/useGetMeetingTimeStatus";
import { useCancelBookingMutation } from "../slices/bookingApiSlice";
import { markBookingCanceled } from "../slices/bookingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingComponent from "../components/Loader";
import { ErrorResponse } from "../interfaces/interfaces";

const BookingDetails = () => {
  const navigate = useNavigate();
  const bookingId = useParams().id;
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useBookingDetailsQuery(bookingId);
  const Booking = data?.booking;
  const startingIn = Booking ? getMeetingTimeStatus(Booking.startTime) : "";
  const isOccured = Booking ? Date.now() < new Date(Booking.startTime).getTime() : false;

  const [cancel, { isLoading: isLoadingCancel, isError: isErrorCancel }] = useCancelBookingMutation();

  const cancelBooking = async () => {
    if (!Booking) return;
    try {
      const response = await cancel(Booking._id).unwrap();
      if (response) {
        //@ts-ignore
        dispatch(markBookingCanceled(bookingId));
        toast.success("Booking canceled");
      }
    } catch (err) {
      const errorResponse = err as ErrorResponse;
      toast.error(errorResponse.data?.message || errorResponse.error);
    }
  };

  const truncateText = (text?: string, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (isLoading || isLoadingCancel) {
    return <LoadingComponent />;
  }

  if (isError || isErrorCancel) {
    return <div className="text-2xl text-white h-screen">Error</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 w-full">
      <div className="flex flex-col items-center p-5 bg-home border rounded-lg border-gray-400 w-full max-w-lg sm:max-w-md text-white">
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 cursor-pointer font-heading font-semibold opacity-80 bg-mainText text-black hover:bg-home hover:text-white duration-200 border-gray-500 border rounded-lg"
          >
            Go Back
          </button>
        </div>

        <div className="text-5xl font-bold mb-6 text-secondHeading text-center animate-pulse" >
          {Booking.title}
        </div>

        <div className="flex justify-between w-full border-b border-gray-500 pb-4 items-center">
          <div className="text-lg font-heading">Attendees</div>
          <div className="text-gray-300 text-sm text-right">
            <p className="mb-2">{Booking.guestUser}</p>
            <p>{Booking.first_user}</p>
          </div>
        </div>

        <div className="flex w-full mt-4 pb-4 justify-between border-b border-gray-500">
          <div className="text-lg font-heading">Scheduled at</div>
          <div className="text-gray-300 text-sm text-right">
            <div className="mb-2">
              {new Date(Booking.startTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div>
              {new Date(Booking.startTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between mt-4 pb-4 border-b border-gray-500">
          <div className="text-lg font-heading">Duration</div>
          <div className="font-heading text-sm">
            {//@ts-ignore
            ((new Date(Booking.endTime) - new Date(Booking.startTime)) /
              60000
            ).toFixed(0)}{" "}
            minutes
          </div>
        </div>

        <div className="flex w-full justify-between mt-4 pb-4 border-b border-gray-500">
          <div className="text-lg font-heading">Description</div>
          <div className="w-1/2 text-sm font-heading truncate">
            {truncateText(Booking.description)}
          </div>
        </div>

        <div className="flex w-full justify-between mt-4 pb-4 border-b border-gray-500">
          <div className="text-lg font-heading">Additional Info</div>
          <div className="w-1/2 text-sm font-heading truncate">
            {truncateText(Booking.additionalInfo)}
          </div>
        </div>

        <div className="mt-4 pb-4 text-xl text-center text-gray-500 font-heading">
          {Booking && Booking.canceled ? "Canceled" : startingIn}
        </div>

        {Booking && !Booking.canceled && (
          <div className="w-full flex flex-col justify-center items-center mt-4 space-y-4">
            <a
              href={Booking.event.meetLink}
              target="_blank"
              className="w-full flex justify-center py-2 rounded-lg font-heading hover:bg-gray-500 hover:text-black duration-200 border-gray-500 border"
            >
              Join Event
            </a>
            {isOccured && (
              <button
                onClick={cancelBooking}
                className="w-full flex justify-center font-heading py-2 rounded-lg bg-mainText text-black hover:bg-home hover:text-white duration-200 border-gray-500 border"
              >
                Cancel Event
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
