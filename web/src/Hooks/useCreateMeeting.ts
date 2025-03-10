import { useSelector } from "react-redux";
import { useCreateMeetingMutation } from "../slices/meetingsApiSlice";
import { RootState } from "../store"
import { useEffect, useState } from "react";

export const useCreateMeeting = () => {
  const [createMeeting, { isError }] = useCreateMeetingMutation();
  const activeMeetingInfo = useSelector((state: RootState) => state.meetings.activeMeetingInfo);
  const activeAvailabilitySchedule = useSelector((state: RootState) => state.meetings.activeAvailabilitySchedule);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (activeMeetingInfo && activeAvailabilitySchedule) {
      setIsReady(true);
    }
  }, [activeMeetingInfo, activeAvailabilitySchedule]);

  const createNewMeeting = async () => {
    try {
      
      if (!isReady) {
        console.warn("Waiting for Redux state update...");
        return;
      }

      // if (!activeMeetingInfo || !activeAvailabilitySchedule) {
      //   throw new Error("Active meeting info or availability schedule is missing");
      // }
      console.log(activeMeetingInfo);
      console.log(activeAvailabilitySchedule)
      const response = await createMeeting({
        meetingInfo: activeMeetingInfo?.meetingInfo,
        availabilitySchedule: activeAvailabilitySchedule?.availabilitySchedule
      }).unwrap();
      console.log("Meeting created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating meeting:", error);
      throw error;
    }
  };

  return { createNewMeeting, isError };
};

