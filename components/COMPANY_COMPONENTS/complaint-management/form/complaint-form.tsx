'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  complaintFormSchema,
  ComplaintFormSchemaType
} from 'schema/company-panel';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormWrapper from './form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import apiCall from '@/lib/axios';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ComplaintForm = ({
  mode,
  complaintID
}: {
  mode: string;
  complaintID?: string;
}) => {
  const [showTime, setShowTime] = useState(false);
  const datePickerRef = useRef<any>(null);
  const router = useRouter();
  const form = useForm<ComplaintFormSchemaType>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      complaintID: '',
      hotelID: '',
      complaintCategory: '',
      description: '',
      feedback: '',
      status: 'Open',
      assignedStaff: '',
      dateAndTime: ''
    }
  });

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      if ((mode === 'view' || mode === 'userViewByHotel') && complaintID) {
        try {
          const endpoint =
            mode === 'userViewByHotel'
              ? `api/complaint/hotel/complaints/${complaintID}`
              : `api/complaint/platform/complaints/${complaintID}`;

          const res = await apiCall<{ complaint: any }>('GET', endpoint);

          const complaint = res.complaint;

          form.reset({
            complaintID: complaint._id,
            hotelID: complaint.HotelId._id || 'N/A',
            complaintCategory: complaint.complaintType,
            description: complaint.description,
            feedback: complaint.feedback || '',
            status: complaint.status,
            assignedStaff: complaint.assignedTo
              ? `${complaint.assignedTo.firstName} ${complaint.assignedTo.lastName}`
              : 'Unassigned',
            dateAndTime: complaint.createdAt
              ? new Date(complaint.createdAt).toISOString()
              : ''
          });
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || 'Failed to load complaint details';
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
          console.error('Failed to load complaint details:', err);
        }
      }
    };

    fetchComplaintDetails();
  }, [complaintID, mode]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (mode === 'addSuperToHotel') {
        try {
          setLoading(true);
          const res = await apiCall<{ employees: any[] }>(
            'GET',
            'api/employee/'
          );
          setEmployees(res.employees);
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || 'Failed to fetch employees';
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
          console.error('Failed to fetch employees:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [mode]);

  useEffect(() => {
    console.log('ComplaintForm mode:', mode);
  }, [mode]);

  const onSubmit = async (data: ComplaintFormSchemaType) => {
    console.log('onSubmit called with mode:', mode, 'data:', data);
    try {
      const admin = JSON.parse(sessionStorage.getItem('admin') || '{}');
      if (!admin?.user?.id) {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to submit a complaint'
        });
        return;
      }
      
      console.log('Form data before submission:', data); // Debug log

      // For 'addHotelToSuperAdmin' mode, manually validate required fields
      if (mode === 'addHotelToSuperAdmin') {
        if (!data.complaintCategory || !data.description) {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please fill in all required fields'
          });
          return;
        }
      }

      if (mode === 'addSuperToHotel') {
        const payload = {
          scope: 'Platform',
          raisedByAdmin: admin.user.id,
          HotelId: data.hotelID,
          complaintType: data.complaintCategory,
          description: data.description,
          status: data.status
        };

        await ToastAtTopRight.fire({
          title: 'Submitting...',
          text: 'Please wait while we process your complaint',
          allowOutsideClick: false,
          didOpen: () => {}
        });

        try {
          await apiCall(
            'POST',
            'api/complaint/platform/complaints/platform',
            payload
          );

          await ToastAtTopRight.fire({
            icon: 'success',
            title: 'Success',
            text: 'Complaint submitted successfully!'
          });

          form.reset();
          setTimeout(() => {
            router.push('/super-admin/complaint-management');
          }, 1500);
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || 'Failed to submit complaint';
          await ToastAtTopRight.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: errorMessage
          });
        }
      } else if (mode === 'addHotelToSuperAdmin') {
        // New handler for addHotelToSuperAdmin with minimal payload
        const payload = {
          complaintType: data.complaintCategory, // e.g. "Subscription"
          description: data.description // e.g. "Not able to access Roles"
        };

        await ToastAtTopRight.fire({
          title: 'Submitting...',
          text: 'Please wait while we process your complaint',
          allowOutsideClick: false,
          didOpen: () => {}
        });

        try {
          await apiCall('POST', 'api/complaint/hotel/complaints', payload);

          await ToastAtTopRight.fire({
            icon: 'success',
            title: 'Success',
            text: 'Complaint submitted successfully!'
          });

          form.reset();
          setTimeout(() => {
            router.push('/hotel-panel/complaint-management'); // or correct route
          }, 1500);
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || 'Failed to submit complaint';
          await ToastAtTopRight.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: errorMessage
          });
        }
      }
    } catch (err: any) {
      await ToastAtTopRight.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <>
      <FormWrapper title="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full rounded-lg"
          >
            {/* Main Grid: Two Sides */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* Left Side */}
              <div className="flex flex-col gap-3">
                {mode !== 'addSuperToHotel' &&
                  mode !== 'addHotelToSuperAdmin' && (
                    <FormField
                      control={form.control}
                      name="complaintID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700">
                            Complaint ID
                          </FormLabel>
                          <div className="w-full">
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                disabled={
                                  mode === 'view' || mode === 'userViewByHotel'
                                }
                                className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] mt-1" />
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                <FormField
                  control={form.control}
                  name="hotelID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700">
                        Hotel ID
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            disabled={
                              mode === 'view' || mode === 'userViewByHotel'
                            }
                            className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complaintCategory"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700">
                        Complaint Category
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          {mode === 'view' ? (
                            <Input
                              type="text"
                              {...field}
                              disabled={true}
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                            />
                          ) : (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="min-w-32 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                                <SelectValue placeholder="Select Complaint Category" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#362913] text-sm rounded-2xl text-white border-2 shadow-md border-white">
                                {[
                                  'Subscription',
                                  'Technical',
                                  'Billing',
                                  'Room',
                                  'Washroom',
                                  'Other'
                                ].map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </FormControl>
                        <FormMessage className="text-[10px] mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row gap-2">
                      <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700 pt-2">
                        Description
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={
                              mode === 'view' || mode === 'userViewByHotel'
                            }
                            className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none disabled:opacity-100 text-xs 2xl:text-sm min-h-[100px]"
                            placeholder="Enter complaint description..."
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                {(mode == 'view' || mode == 'userViewByHotel') && (
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700">
                          Feedback
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={
                                mode === 'view' || mode === 'userViewByHotel'
                              }
                              className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none outline-none focus:ring-0 text-xs 2xl:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                {/* Refund Status */}
                {(mode === 'view' || mode === 'userViewByHotel') && (
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row gap-2">
                        <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700 pt-1">
                          Status
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={
                                mode === 'view' || mode === 'userViewByHotel'
                              }
                              className="flex flex-col space-y-2"
                            >
                              {['Open', 'Resolved', 'Closed', 'Inprogress'].map(
                                (value) => (
                                  <div
                                    key={value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem value={value} id={value} />
                                    <label
                                      htmlFor={value}
                                      className="text-xs 2xl:text-sm text-gray-700 capitalize"
                                    >
                                      {value}
                                    </label>
                                  </div>
                                )
                              )}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Right Side */}
              <div className="flex flex-col items-center md:items-start space-y-8">
                {/* Create Code */}
                {mode !== 'addHotelToSuperAdmin' && (
                  <FormField
                    control={form.control}
                    name="assignedStaff"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <FormLabel className="w-full sm:w-48 text-xs 2xl:text-sm font-medium text-gray-700">
                          Assigned Staff
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            {mode === 'addSuperToHotel' ? (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={loading}
                              >
                                <SelectTrigger className="min-w-40 bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none placeholder:text-xs">
                                  <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent className="max-h-48">
                                  {employees.map((emp) => (
                                    <SelectItem key={emp._id} value={emp._id}>
                                      {emp.firstName} {emp.lastName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-xs 2xl:text-sm min-h-[40px] flex items-center">
                                {field.value || 'N/A'}
                              </div>
                            )}
                          </FormControl>
                          <FormMessage className="text-[10px] mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="dateAndTime"
                  render={({ field }) => {
                    if (
                      mode === 'addSuperToHotel' ||
                      mode === 'addHotelToSuperAdmin'
                    ) {
                      return (
                        <FormItem className="flex flex-col sm:flex-row gap-2">
                          <FormLabel className="w-full sm:w-40 text-xs 2xl:text-sm font-medium text-gray-700 pt-2">
                            Date & Time
                          </FormLabel>
                          <div className="w-full">
                            <FormControl>
                              <div className="relative [&_.react-datepicker-wrapper]:w-full">
                                <div className="relative w-full">
                                  <DatePicker
                                    ref={datePickerRef}
                                    selected={
                                      field.value ? new Date(field.value) : null
                                    }
                                    onChange={(date) => {
                                      field.onChange(date?.toISOString() || '');
                                      setShowTime(false);
                                    }}
                                    showTimeSelect={showTime}
                                    showTimeSelectOnly={showTime}
                                    onClickOutside={() => setShowTime(false)}
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat={
                                      showTime
                                        ? 'h:mm aa'
                                        : 'MMMM d, yyyy h:mm aa'
                                    }
                                    className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-xs 2xl:text-sm pr-8"
                                    wrapperClassName="w-full"
                                    calendarClassName="[&_.react-datepicker__time-container]:!w-24 [&_.react-datepicker__time-container_li]:!text-sm [&_.react-datepicker__time-container_li]:!p-1 [&_.react-datepicker__time-container_li]:!rounded [&_.react-datepicker__time-container_li:hover]:!bg-gray-100"
                                    placeholderText="Select date and time"
                                    onFocus={() => {
                                      setShowTime(false);
                                    }}
                                  />
                                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setShowTime(!showTime);
                                        if (datePickerRef.current) {
                                          datePickerRef.current.setOpen(true);
                                        }
                                      }}
                                      className="text-gray-500 hover:text-gray-700 p-1"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setShowTime(false);
                                        if (datePickerRef.current) {
                                          datePickerRef.current.setOpen(true);
                                        }
                                      }}
                                      className="text-gray-500 hover:text-gray-700 p-1"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <rect
                                          x="3"
                                          y="4"
                                          width="18"
                                          height="18"
                                          rx="2"
                                          ry="2"
                                        ></rect>
                                        <line
                                          x1="16"
                                          y1="2"
                                          x2="16"
                                          y2="6"
                                        ></line>
                                        <line
                                          x1="8"
                                          y1="2"
                                          x2="8"
                                          y2="6"
                                        ></line>
                                        <line
                                          x1="3"
                                          y1="10"
                                          x2="21"
                                          y2="10"
                                        ></line>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-[10px] mt-1" />
                          </div>
                        </FormItem>
                      );
                    }

                    // For view/edit modes, show the date or 'N/A'
                    return (
                      <FormItem className="flex flex-col sm:flex-row gap-2">
                        <FormLabel className="w-full sm:w-32 text-xs 2xl:text-sm font-medium text-gray-700 pt-2">
                          Date & Time
                        </FormLabel>
                        <div className="w-full flex items-center">
                          <div className="bg-[#F6EEE0] text-gray-700 p-2 rounded-md text-xs 2xl:text-sm w-full">
                            {field.value
                              ? !isNaN(new Date(field.value).getTime())
                                ? new Date(field.value).toLocaleString()
                                : 'N/A'
                              : 'N/A'}
                          </div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            {mode === 'edit' && (
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                {' '}
                <Button type="submit" className="btn-primary">
                  Save Changes
                </Button>
              </div>
            )}
            {mode === 'addSuperToHotel' && (
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <Button type="submit" className="btn-primary">
                  Create Complaint
                </Button>
              </div>
            )}
            {mode === 'addHotelToSuperAdmin' && (
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <Button type="submit" className="btn-primary">
                  Add Complaint
                </Button>
              </div>
            )}

            {(mode === 'userViewByHotel' || mode === 'view') && (
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  type="submit"
                  className="btn-primary"
                  onClick={() => router.back()}
                >
                  Close
                </Button>
              </div>
            )}
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};

export default ComplaintForm;
