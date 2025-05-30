'use client';

import React, { useState, useEffect } from 'react';
import { apiCall } from '@/lib/axios';
import { Camera, Clock, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ToastAtTopRight } from '@/lib/sweetalert';

type FacilityType = 'Gym' | 'ConferenceHall' | 'CommunityHall';

interface FacilitySlot {
  _id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  price: number;
  maxCapacity: number;
  currentCapacity: number;
}

interface Facility {
  _id: string;
  facilityType: FacilityType;
  name: string;
  images: string[];
  slots: FacilitySlot[];
  HotelId: string;
  __v: number;
}

interface FacilitiesResponse {
  success: boolean;
  page: number;
  pages: number;
  total: number;
  data: Facility[];
}

interface FacilitiesByType {
  Gym: Facility[];
  ConferenceHall: Facility[];
  CommunityHall: Facility[];
}
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const AddFacilities = () => {
  const router = useRouter();
  const [images, setImages] = useState<(string | null)[]>(Array(12).fill(null));
  const [facilities, setFacilities] = useState<FacilitiesByType>({
    Gym: [],
    ConferenceHall: [],
    CommunityHall: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState(
    daysOfWeek.map(() => ({
      enabled: false,
      timeSlots: [{ from: '', to: '', maxCapacity: '' }],
      price: ''
    }))
  );

  const [conferenceHallAvailability, setConferenceHallAvailability] = useState(
    daysOfWeek.map(() => ({
      enabled: false,
      timeSlots: [{ from: '', to: '' }],
      price: ''
    }))
  );

  const [communityHallAvailability, setCommunityHallAvailability] = useState(
    daysOfWeek.map(() => ({
      enabled: false,
      timeSlots: [{ from: '', to: '' }],
      price: ''
    }))
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...images];
        updated[index] = reader.result as string;
        setImages(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index: number) => {
    const input = document.getElementById(
      `upload-${index}`
    ) as HTMLInputElement;
    input?.click();
  };

  const toggleDay = (index: number) => {
    const updated = [...availability];
    updated[index].enabled = !updated[index].enabled;
    setAvailability(updated);
  };

  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: 'from' | 'to' | 'maxCapacity',
    value: string
  ) => {
    const updated = [...availability];
    updated[dayIndex].timeSlots[slotIndex][field] = value;
    setAvailability(updated);
  };

  const addTimeSlot = (dayIndex: number) => {
    const updated = [...availability];
    if (updated[dayIndex].timeSlots.length < 4) {
      updated[dayIndex].timeSlots.push({ from: '', to: '', maxCapacity: '' });
      setAvailability(updated);
    }
  };

  const addConferenceTimeSlot = (dayIndex: number) => {
    const updated = [...conferenceHallAvailability];
    if (updated[dayIndex].timeSlots.length < 4) {
      updated[dayIndex].timeSlots.push({ from: '', to: '' });
      setConferenceHallAvailability(updated);
    }
  };

  const addCommunityTimeSlot = (dayIndex: number) => {
    const updated = [...communityHallAvailability];
    if (updated[dayIndex].timeSlots.length < 4) {
      updated[dayIndex].timeSlots.push({ from: '', to: '' });
      setCommunityHallAvailability(updated);
    }
  };

  const removeConferenceTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...conferenceHallAvailability];
    if (updated[dayIndex].timeSlots.length > 1) {
      updated[dayIndex].timeSlots.splice(slotIndex, 1);
      setConferenceHallAvailability(updated);
    }
  };

  const removeCommunityTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...communityHallAvailability];
    if (updated[dayIndex].timeSlots.length > 1) {
      updated[dayIndex].timeSlots.splice(slotIndex, 1);
      setCommunityHallAvailability(updated);
    }
  };

  const toggleConferenceDay = (index: number) => {
    const updated = [...conferenceHallAvailability];
    updated[index].enabled = !updated[index].enabled;
    setConferenceHallAvailability(updated);
  };

  const toggleCommunityDay = (index: number) => {
    const updated = [...communityHallAvailability];
    updated[index].enabled = !updated[index].enabled;
    setCommunityHallAvailability(updated);
  };

  const handleConferenceTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: 'from' | 'to',
    value: string
  ) => {
    const updated = [...conferenceHallAvailability];
    updated[dayIndex].timeSlots[slotIndex][field] = value;
    setConferenceHallAvailability(updated);
  };

  const handleCommunityTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: 'from' | 'to',
    value: string
  ) => {
    const updated = [...communityHallAvailability];
    updated[dayIndex].timeSlots[slotIndex][field] = value;
    setCommunityHallAvailability(updated);
  };

  const handlePriceChange = (
    dayIndex: number,
    value: string,
    type: 'conference' | 'community' | 'gym' = 'conference'
  ) => {
    if (type === 'conference') {
      const updated = [...conferenceHallAvailability];
      updated[dayIndex].price = value;
      setConferenceHallAvailability(updated);
    } else if (type === 'community') {
      const updated = [...communityHallAvailability];
      updated[dayIndex].price = value;
      setCommunityHallAvailability(updated);
    } else {
      const updated = [...availability];
      updated[dayIndex].price = value;
      setAvailability(updated);
    }
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...availability];
    if (updated[dayIndex].timeSlots.length > 1) {
      updated[dayIndex].timeSlots.splice(slotIndex, 1);
      setAvailability(updated);
    }
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const res = await apiCall<FacilitiesResponse>(
          'GET',
          'api/services/facility/items'
        );

        const grouped: FacilitiesByType = {
          Gym: [],
          ConferenceHall: [],
          CommunityHall: []
        };

        res.data.forEach((facility) => {
          grouped[facility.facilityType].push(facility);
        });

        setFacilities(grouped);

        // GYM
        const gym = grouped.Gym[0];
        if (gym) {
          const gymAvailability = daysOfWeek.map((day) => {
            const daySlots = gym.slots.filter((s) => s.dayOfWeek === day);
            return {
              enabled: !!daySlots.length,
              timeSlots: daySlots.length
                ? daySlots.map((s) => ({
                    from: s.startTime,
                    to: s.endTime,
                    maxCapacity: s.maxCapacity.toString()
                  }))
                : [{ from: '', to: '', maxCapacity: '' }],
              price: daySlots[0]?.price?.toString() || ''
            };
          });
          setAvailability(gymAvailability);
          if (gym.images.length)
            setImages((prev) => [
              ...gym.images,
              ...Array(12 - gym.images.length).fill(null)
            ]);
        }

        // CONFERENCE
        const conf = grouped.ConferenceHall[0];
        if (conf) {
          const confAvailability = daysOfWeek.map((day) => {
            const daySlots = conf.slots.filter((s) => s.dayOfWeek === day);
            return {
              enabled: !!daySlots.length,
              timeSlots: daySlots.length
                ? daySlots.map((s) => ({ from: s.startTime, to: s.endTime }))
                : [{ from: '', to: '' }],
              price: daySlots[0]?.price?.toString() || ''
            };
          });
          setConferenceHallAvailability(confAvailability);
        }

        // COMMUNITY
        const comm = grouped.CommunityHall[0];
        if (comm) {
          const commAvailability = daysOfWeek.map((day) => {
            const daySlots = comm.slots.filter((s) => s.dayOfWeek === day);
            return {
              enabled: !!daySlots.length,
              timeSlots: daySlots.length
                ? daySlots.map((s) => ({ from: s.startTime, to: s.endTime }))
                : [{ from: '', to: '' }],
              price: daySlots[0]?.price?.toString() || ''
            };
          });
          setCommunityHallAvailability(commAvailability);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch facilities');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const buildPayload = (
    facilityType: FacilityType,
    name: string,
    availabilityState:
      | typeof availability
      | typeof conferenceHallAvailability
      | typeof communityHallAvailability
  ) => {
    const slots = availabilityState.flatMap((day, index) => {
      if (!day.enabled) return [];
      return day.timeSlots.map((slot: any) => ({
        dayOfWeek: daysOfWeek[index],
        startTime: slot.from,
        endTime: slot.to,
        price: parseFloat(day.price || '0'),
        maxCapacity: parseInt(slot.maxCapacity || '1') || 1
      }));
    });

    return {
      facilityType,
      name,
      images: images.filter(Boolean), // only valid images
      slots
    };
  };

  const validateFacility = (availabilityState: any, facilityName: string) => {
    const errors: string[] = [];
    
    // Check if any day is enabled
    const hasEnabledDay = availabilityState.some((day: any) => day.enabled);
    if (!hasEnabledDay) {
      errors.push(`Please enable at least one day for ${facilityName}`);
      return { isValid: false, errors };
    }

    // Check each enabled day
    availabilityState.forEach((day: any, dayIndex: number) => {
      if (!day.enabled) return;

      // Check if price is provided
      if (!day.price || parseFloat(day.price) <= 0) {
        errors.push(`Please enter a valid price for ${daysOfWeek[dayIndex]} in ${facilityName}`);
      }

      // Check each time slot
      day.timeSlots.forEach((slot: any, slotIndex: number) => {
        if (!slot.from) {
          errors.push(`Please select start time for ${daysOfWeek[dayIndex]} slot ${slotIndex + 1} in ${facilityName}`);
        }
        if (!slot.to) {
          errors.push(`Please select end time for ${daysOfWeek[dayIndex]} slot ${slotIndex + 1} in ${facilityName}`);
        }
        if (facilityName === 'Gym' && (!slot.maxCapacity || parseInt(slot.maxCapacity) <= 0)) {
          errors.push(`Please enter a valid capacity for ${daysOfWeek[dayIndex]} slot ${slotIndex + 1} in ${facilityName}`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const showValidationErrors = (errors: string[]) => {
    errors.forEach(error => {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error,
        timer: 4000,
        showConfirmButton: false,
      });
    });
  };

  const handleGymSave = async () => {
    try {
      const { isValid, errors } = validateFacility(availability, 'Gym');
      if (!isValid) {
        showValidationErrors(errors);
        return;
      }

      const payload = buildPayload('Gym', 'Gym', availability);
      await apiCall('POST', 'api/services/facility/items', payload);
      
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Gym availability saved successfully!',
        timer: 3000,
        showConfirmButton: false,
      });
      
      router.back();
    } catch (err: any) {
      console.error('Gym Save Failed', err);
      ToastAtTopRight.fire({
        icon: 'error',
        title: err.response?.data?.message || 'Failed to save gym availability',
        timer: 4000,
      });
    }
  };

  const handleConferenceSave = async () => {
    try {
      const { isValid, errors } = validateFacility(conferenceHallAvailability, 'Conference Hall');
      if (!isValid) {
        showValidationErrors(errors);
        return;
      }

      const payload = buildPayload(
        'ConferenceHall',
        'ConferenceHall',
        conferenceHallAvailability
      );
      await apiCall('POST', 'api/services/facility/items', payload);
      
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Conference hall availability saved successfully!',
        timer: 3000,
        showConfirmButton: false,
      });
      
      router.back();
    } catch (err: any) {
      console.error('Conference Save Failed', err);
      ToastAtTopRight.fire({
        icon: 'error',
        title: err.response?.data?.message || 'Failed to save conference hall availability',
        timer: 4000,
      });
    }
  };

  const handleCommunitySave = async () => {
    try {
      const { isValid, errors } = validateFacility(communityHallAvailability, 'Community Hall');
      if (!isValid) {
        showValidationErrors(errors);
        return;
      }

      const payload = buildPayload(
        'CommunityHall',
        'CommunityHall',
        communityHallAvailability
      );
      await apiCall('POST', 'api/services/facility/items', payload);
      
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Community hall availability saved successfully!',
        timer: 3000,
        showConfirmButton: false,
      });
      
      router.back();
    } catch (err: any) {
      console.error('Community Save Failed', err);
      ToastAtTopRight.fire({
        icon: 'error',
        title: err.response?.data?.message || 'Failed to save community hall availability',
        timer: 4000,
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="p-4 sm:p-6 rounded-lg shadow-md bg-[#FAF6EF] w-full mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upload Gym Equipments
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-6 border-t pt-4 border-gray-300">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => triggerFileInput(index)}
              className="aspect-square bg-[#F6EEE0] rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              {img ? (
                <Image
                  src={img}
                  alt={`equipment-${index}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <Camera className="text-[#a67c52] w-6 h-6 font-light" />
              )}
              <input
                id={`upload-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <hr className="border-t border-gray-300 my-6" />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#F6EEE0] text-gray-800 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </Button>
          <Button
            // onClick={handleGymSave}
            className="px-6 py-2 bg-[#a67c52] text-white rounded-md hover:bg-[#8a633d] transition"
          >
            Save
          </Button>
        </div>
      </div>

      {/* GYM AVAILABILITY */}
      <div className="p-4 sm:p-6 rounded-lg shadow-md bg-[#FAF6EF] w-full mx-auto mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Gym Availability
          </h2>
          {loading && (
            <div className="text-sm text-gray-500">Loading gym data...</div>
          )}
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>

        <div className="space-y-4 border-t pt-4 border-gray-300">
          <div className="flex items-center gap-20">
            <h3 className="font-medium text-base text-gray-500 min-w-[120px]">
              Select Availability
            </h3>
            <p className="font-medium text-base text-gray-500 flex-1">
              Select Time Slots
            </p>
          </div>
          {availability.map((day, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-20"
            >
              <div className="flex items-center gap-2 min-w-[120px]">
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={() => toggleDay(i)}
                  className="accent-[#a67c52] w-4 h-4"
                />
                <span className="text-gray-800">{daysOfWeek[i]}</span>
              </div>

              <div className="flex items-center gap-4 w-full">
                <div className="flex-1">
                  {day.timeSlots.map((slot, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 max-w-[595px] mb-2 last:mb-0"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={slot.from}
                          onChange={(e) =>
                            handleTimeChange(i, j, 'from', e.target.value)
                          }
                          className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                          disabled={!day.enabled}
                        />
                        <Clock size={16} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">to</span>
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={slot.to}
                          onChange={(e) =>
                            handleTimeChange(i, j, 'to', e.target.value)
                          }
                          className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                          disabled={!day.enabled}
                        />
                        <Clock size={16} className="text-gray-500" />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          min="1"
                          value={slot.maxCapacity}
                          onChange={(e) =>
                            handleTimeChange(
                              i,
                              j,
                              'maxCapacity',
                              e.target.value
                            )
                          }
                          placeholder="Capacity"
                          className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                          disabled={!day.enabled}
                        />
                      </div>
                      {j > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(i, j)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Remove time slot"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      {j === day.timeSlots.length - 1 && (
                        <button
                          type="button"
                          onClick={() => addTimeSlot(i)}
                          className={`bg-[#a67c52] text-white p-1 rounded hover:bg-[#8a633d] transition ${day.timeSlots.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!day.enabled || day.timeSlots.length >= 4}
                          title={
                            day.timeSlots.length >= 4
                              ? 'Maximum 4 time slots allowed'
                              : 'Add time slot'
                          }
                        >
                          <Plus size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={day.price}
                    onChange={(e) =>
                      handlePriceChange(i, e.target.value, 'gym')
                    }
                    placeholder="Price (₹)"
                    className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                    disabled={!day.enabled}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t border-gray-300 my-6" />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#F6EEE0] text-gray-800 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGymSave}
            className="px-6 py-2 bg-[#a67c52] text-white rounded-md hover:bg-[#8a633d] transition"
          >
            Save
          </Button>
        </div>
      </div>

      {/* CONFERENCE HALL AVAILABILITY */}
      <div className="p-4 sm:p-6 rounded-lg shadow-md bg-[#FAF6EF] w-full mx-auto mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Conference Hall Availability
          </h2>
          {loading && (
            <div className="text-sm text-gray-500">
              Loading conference hall data...
            </div>
          )}
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>

        <div className="space-y-4 border-t pt-4 border-gray-300">
          <div className="flex items-center gap-20">
            <h3 className="font-medium text-base text-gray-500 min-w-[120px]">
              Select Availability
            </h3>
            <p className="font-medium text-base text-gray-500 flex-1">
              Select Time Slots
            </p>
            <p className="font-medium text-base text-gray-500 w-32">
              Set Price (₹)
            </p>
          </div>
          {conferenceHallAvailability.map((day, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-20"
            >
              <div className="flex items-center gap-2 min-w-[120px]">
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={() => toggleConferenceDay(i)}
                  className="accent-[#a67c52] w-4 h-4"
                />
                <span className="text-gray-800">{daysOfWeek[i]}</span>
              </div>

              <div className="flex flex-col gap-2 w-full">
                {day.timeSlots.map((slot, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 w-full max-w-[500px]"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={slot.from}
                        onChange={(e) =>
                          handleConferenceTimeChange(
                            i,
                            j,
                            'from',
                            e.target.value
                          )
                        }
                        className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                        disabled={!day.enabled}
                      />
                      <Clock size={16} className="text-gray-500" />
                    </div>
                    <span className="text-gray-600">to</span>
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={slot.to}
                        onChange={(e) =>
                          handleConferenceTimeChange(i, j, 'to', e.target.value)
                        }
                        className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                        disabled={!day.enabled}
                      />
                      <Clock size={16} className="text-gray-500" />
                    </div>
                    {j > 0 && (
                      <button
                        type="button"
                        onClick={() => removeConferenceTimeSlot(i, j)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove time slot"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {j === day.timeSlots.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addConferenceTimeSlot(i)}
                        className={`bg-[#a67c52] text-white p-1 rounded hover:bg-[#8a633d] transition ${day.timeSlots.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!day.enabled || day.timeSlots.length >= 4}
                        title={
                          day.timeSlots.length >= 4
                            ? 'Maximum 4 time slots allowed'
                            : 'Add time slot'
                        }
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-48">
                <input
                  type="number"
                  min="0"
                  value={day.price}
                  onChange={(e) => handlePriceChange(i, e.target.value)}
                  placeholder="0.00"
                  className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                  disabled={!day.enabled}
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t border-gray-300 my-6" />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#F6EEE0] text-gray-800 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConferenceSave}
            className="px-6 py-2 bg-[#a67c52] text-white rounded-md hover:bg-[#8a633d] transition"
          >
            Save
          </Button>
        </div>
      </div>

      {/* COMMUNITY HALL AVAILABILITY */}
      <div className="p-4 sm:p-6 rounded-lg shadow-md bg-[#FAF6EF] w-full mx-auto mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Community Hall Availability
          </h2>
          {loading && (
            <div className="text-sm text-gray-500">
              Loading community hall data...
            </div>
          )}
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>

        <div className="space-y-4 border-t pt-4 border-gray-300">
          <div className="flex items-center gap-20">
            <h3 className="font-medium text-base text-gray-500 min-w-[120px]">
              Select Availability
            </h3>
            <p className="font-medium text-base text-gray-500 flex-1">
              Select Time Slots
            </p>
            <p className="font-medium text-base text-gray-500 w-32">
              Set Price (₹)
            </p>
          </div>
        </div>

        {communityHallAvailability.map((day, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-20 mt-4"
          >
            <div className="flex items-center gap-2 min-w-[120px]">
              <input
                type="checkbox"
                checked={day.enabled}
                onChange={() => toggleCommunityDay(i)}
                className="accent-[#a67c52] w-4 h-4"
              />
              <span className="text-gray-800">{daysOfWeek[i]}</span>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {day.timeSlots.map((slot, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2 w-full max-w-[500px]"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={slot.from}
                      onChange={(e) =>
                        handleCommunityTimeChange(i, j, 'from', e.target.value)
                      }
                      className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                      disabled={!day.enabled}
                    />
                    <Clock size={16} className="text-gray-500" />
                  </div>
                  <span className="text-gray-600">to</span>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={slot.to}
                      onChange={(e) =>
                        handleCommunityTimeChange(i, j, 'to', e.target.value)
                      }
                      className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                      disabled={!day.enabled}
                    />
                    <Clock size={16} className="text-gray-500" />
                  </div>
                  {j > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCommunityTimeSlot(i, j)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove time slot"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  {j === day.timeSlots.length - 1 && (
                    <button
                      type="button"
                      onClick={() => addCommunityTimeSlot(i)}
                      className={`bg-[#a67c52] text-white p-1 rounded hover:bg-[#8a633d] transition ${day.timeSlots.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!day.enabled || day.timeSlots.length >= 4}
                      title={
                        day.timeSlots.length >= 4
                          ? 'Maximum 4 time slots allowed'
                          : 'Add time slot'
                      }
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="w-48">
              <input
                type="number"
                min="0"
                value={day.price}
                onChange={(e) =>
                  handlePriceChange(i, e.target.value, 'community')
                }
                placeholder="0.00"
                className="bg-[#F6EEE0] text-gray-700 px-2 py-1 rounded w-full"
                disabled={!day.enabled}
              />
            </div>
          </div>
        ))}
        <hr className="border-t border-gray-300 my-6" />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#F6EEE0] text-gray-800 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCommunitySave}
            className="px-6 py-2 bg-[#a67c52] text-white rounded-md hover:bg-[#8a633d] transition"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AddFacilities;
